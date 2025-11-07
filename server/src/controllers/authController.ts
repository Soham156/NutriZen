import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../config/database.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt.js';
import { AppError } from '../middleware/errorHandler.js';

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10');

// Register new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, fullName } = req.body;

    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    if (password.length < 8) {
      throw new AppError('Password must be at least 8 characters long', 400);
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      throw new AppError('User with this email already exists', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create user
    const result = await query(
      `INSERT INTO users (email, password_hash, full_name, email_verified) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, full_name, created_at`,
      [email.toLowerCase(), passwordHash, fullName || null, false]
    );

    const user = result.rows[0];

    // Create user profile
    await query(
      'INSERT INTO user_profiles (user_id) VALUES ($1)',
      [user.id]
    );

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        user.id,
        refreshToken,
        expiresAt,
        req.headers['user-agent'] || null,
        req.ip || req.socket.remoteAddress || null,
      ]
    );

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          createdAt: user.created_at,
        },
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Find user
    const result = await query(
      'SELECT id, email, password_hash, full_name, is_active, email_verified FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      // Log failed attempt
      await query(
        `INSERT INTO login_attempts (email, ip_address, user_agent, success, failure_reason) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          email.toLowerCase(),
          req.ip || req.socket.remoteAddress || null,
          req.headers['user-agent'] || null,
          false,
          'User not found',
        ]
      );
      throw new AppError('Invalid email or password', 401);
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.is_active) {
      throw new AppError('Account is deactivated', 403);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      // Log failed attempt
      await query(
        `INSERT INTO login_attempts (email, ip_address, user_agent, success, failure_reason) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          email.toLowerCase(),
          req.ip || req.socket.remoteAddress || null,
          req.headers['user-agent'] || null,
          false,
          'Invalid password',
        ]
      );
      throw new AppError('Invalid email or password', 401);
    }

    // Update last login
    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        user.id,
        refreshToken,
        expiresAt,
        req.headers['user-agent'] || null,
        req.ip || req.socket.remoteAddress || null,
      ]
    );

    // Log successful attempt
    await query(
      `INSERT INTO login_attempts (email, ip_address, user_agent, success) 
       VALUES ($1, $2, $3, $4)`,
      [
        email.toLowerCase(),
        req.ip || req.socket.remoteAddress || null,
        req.headers['user-agent'] || null,
        true,
      ]
    );

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          emailVerified: user.email_verified,
        },
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Refresh access token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: token } = req.cookies;

    if (!token) {
      throw new AppError('Refresh token not provided', 401);
    }

    // Verify token
    const payload = verifyToken(token);

    // Check if token exists and is not revoked
    const result = await query(
      'SELECT id, user_id, revoked FROM refresh_tokens WHERE token = $1',
      [token]
    );

    if (result.rows.length === 0 || result.rows[0].revoked) {
      throw new AppError('Invalid or revoked refresh token', 401);
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
    });

    res.json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: token } = req.cookies;

    if (token) {
      // Revoke refresh token
      await query(
        'UPDATE refresh_tokens SET revoked = true, revoked_at = NOW() WHERE token = $1',
        [token]
      );
    }

    // Clear cookie
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const result = await query(
      `SELECT u.id, u.email, u.full_name, u.email_verified, u.created_at, u.last_login,
              p.avatar_url, p.bio, p.date_of_birth, p.gender, p.phone_number
       FROM users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
