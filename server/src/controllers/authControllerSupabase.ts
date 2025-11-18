import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../config/supabase.js';
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
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        full_name: fullName || null,
        email_verified: false,
      })
      .select('id, email, full_name, created_at')
      .single();

    if (userError) throw new Error(userError.message);

    // Create user profile
    await supabase.from('user_profiles').insert({ user_id: user.id });

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await supabase.from('refresh_tokens').insert({
      user_id: user.id,
      token: refreshToken,
      expires_at: expiresAt.toISOString(),
      user_agent: req.headers['user-agent'] || null,
      ip_address: req.ip || req.socket.remoteAddress || null,
    });

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
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
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, password_hash, full_name, is_active, email_verified')
      .eq('email', email.toLowerCase())
      .single();

    if (userError || !user) {
      // Log failed attempt
      await supabase.from('login_attempts').insert({
        email: email.toLowerCase(),
        ip_address: req.ip || req.socket.remoteAddress || null,
        user_agent: req.headers['user-agent'] || null,
        success: false,
        failure_reason: 'User not found',
      });
      throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (!user.is_active) {
      throw new AppError('Account is deactivated', 403);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      // Log failed attempt
      await supabase.from('login_attempts').insert({
        email: email.toLowerCase(),
        ip_address: req.ip || req.socket.remoteAddress || null,
        user_agent: req.headers['user-agent'] || null,
        success: false,
        failure_reason: 'Invalid password',
      });
      throw new AppError('Invalid email or password', 401);
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await supabase.from('refresh_tokens').insert({
      user_id: user.id,
      token: refreshToken,
      expires_at: expiresAt.toISOString(),
      user_agent: req.headers['user-agent'] || null,
      ip_address: req.ip || req.socket.remoteAddress || null,
    });

    // Log successful attempt
    await supabase.from('login_attempts').insert({
      email: email.toLowerCase(),
      ip_address: req.ip || req.socket.remoteAddress || null,
      user_agent: req.headers['user-agent'] || null,
      success: true,
    });

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
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
    const { data: tokenData } = await supabase
      .from('refresh_tokens')
      .select('id, user_id, revoked')
      .eq('token', token)
      .single();

    if (!tokenData || tokenData.revoked) {
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
      await supabase
        .from('refresh_tokens')
        .update({ revoked: true, revoked_at: new Date().toISOString() })
        .eq('token', token);
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

    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id, email, full_name, email_verified, created_at, last_login,
        user_profiles (avatar_url, bio, date_of_birth, gender, phone_number)
      `)
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
