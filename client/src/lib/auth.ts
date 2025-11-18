const API_URL = import.meta.env.VITE_API_URL || 'https://nutri-zen-server.vercel.app/api';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  emailVerified: boolean;
  avatarUrl?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    accessToken: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  clearAccessToken() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    if (result.data?.accessToken) {
      this.setAccessToken(result.data.accessToken);
    }

    return result;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }

    if (result.data?.accessToken) {
      this.setAccessToken(result.data.accessToken);
    }

    return result;
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
        credentials: 'include',
      });
    } finally {
      this.clearAccessToken();
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch user');
    }

    return result.data.user;
  }

  async refreshToken(): Promise<string> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const accessToken = result.data.accessToken;
    this.setAccessToken(accessToken);
    return accessToken;
  }
}

export const authService = new AuthService();
