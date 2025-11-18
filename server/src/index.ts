import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler.js';
import healthRouter from './routes/health.js';
import apiRouter from './routes/api.js';
import authRouter from './routes/auth.js';
import recipesRouter from './routes/recipes.js';
import chatRouter from './routes/chat.js';
import imageRecognitionRouter from './routes/imageRecognition.js';
import dashboardRouter from './routes/dashboard.js';
import userRouter from './routes/user.js';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'https://nutri-zen.vercel.app';

// Allow multiple origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://nutri-zen.vercel.app',
  'https://nutrizen.vercel.app',
  CLIENT_URL
].filter(Boolean);

console.log('🌐 Allowed CORS origins:', allowedOrigins);
console.log('🔑 CLIENT_URL:', CLIENT_URL);

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Security headers
app.use(cors({
  origin: (origin, callback) => {
    console.log('📡 CORS request from origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ Allowing request with no origin');
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      console.log('✅ Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ Origin blocked:', origin);
      // In production, allow Vercel preview deployments
      if (origin.includes('vercel.app')) {
        console.log('✅ Allowing Vercel deployment:', origin);
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
}));
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Handle preflight requests
app.options('*', cors());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'NutriZen API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      user: '/api/user',
      dashboard: '/api/dashboard',
      recipes: '/api/recipes',
      chat: '/api/chat',
      imageRecognition: '/api/image-recognition'
    }
  });
});

// Routes
app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/chat', chatRouter);
app.use('/api/image-recognition', imageRecognitionRouter);
app.use('/api', apiRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Client URL: ${CLIENT_URL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
