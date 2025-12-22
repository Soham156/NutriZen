# NutriZen Server (Backend)

The backend API server for NutriZen, built with Node.js, Express, and TypeScript.

## 🛠️ Tech Stack

- **Runtime:** Node.js with TypeScript 5.4.5
- **Framework:** Express.js 4.21.2
- **Database:** PostgreSQL (pg 8.16.3)
- **Authentication:** JWT (jsonwebtoken 9.0.2) + bcrypt 6.0.0
- **AI Integration:** Google Generative AI 0.24.1 (Gemini)
- **Cloud Services:** Supabase 2.80.0
- **File Upload:** Multer 2.0.2
- **Validation:** Zod 3.23.8 + express-validator 7.3.0
- **Security:** Helmet 7.1.0 + CORS 2.8.5
- **Logging:** Morgan 1.10.0
- **Development:** tsx 4.7.2 (TypeScript execution)

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- Google Gemini API key
- Supabase account (optional, for cloud storage)

## 🚀 Installation

```bash
# Install dependencies
npm install
```

## ⚙️ Configuration

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/nutrizen
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nutrizen
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Google AI (Gemini)
GEMINI_API_KEY=your-gemini-api-key-here

# Supabase Configuration (Optional)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_BUCKET_NAME=nutrizen-images

# CORS Configuration (Optional)
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-url.com
```

### Getting API Keys

#### Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

#### Supabase Keys (Optional)

1. Create account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > API
4. Copy the URL and keys to your `.env` file

## 🗄️ Database Setup

### Create Database

```bash
# Using psql
psql -U postgres

# In psql console
CREATE DATABASE nutrizen;
\q
```

### Run Migrations

```bash
# Using psql command
psql -U your_username -d nutrizen -f src/database/schema.sql

# Or run the migration script
node runMigration.cjs
```

### Database Schema

The database includes the following main tables:

- `users` - User accounts and credentials
- `health_profiles` - User health information and goals
- `recipes` - Recipe collection
- `user_recipes` - User's saved recipes
- `chat_history` - AI chat conversations
- `nutrition_logs` - Daily nutrition tracking

See [src/database/schema.sql](src/database/schema.sql) for complete schema.

## 🏃 Development

Start the development server with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### API Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "timestamp": "2025-12-22T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

## 🏗️ Build & Production

```bash
# Compile TypeScript to JavaScript
npm run build

# Start production server
npm start

# Or with environment variables
npm start
```

The compiled JavaScript will be in the `dist/` directory.

## 📁 Project Structure

```
server/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts     # PostgreSQL connection pool
│   │   ├── gemini.ts       # Google AI configuration
│   │   └── supabase.ts     # Supabase client setup
│   │
│   ├── controllers/         # Request handlers
│   │   ├── authController.ts
│   │   ├── authControllerSupabase.ts
│   │   ├── chatController.ts
│   │   ├── dashboardController.ts
│   │   ├── imageRecognitionController.ts
│   │   ├── nutritionController.ts
│   │   ├── recipesController.ts
│   │   └── userController.ts
│   │
│   ├── database/            # Database related files
│   │   ├── schema.sql      # Database schema
│   │   ├── migrations/     # Migration files
│   │   └── NORMALIZATION_GUIDE.md
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts         # Authentication middleware
│   │   └── errorHandler.ts # Error handling middleware
│   │
│   ├── routes/              # API route definitions
│   │   ├── api.ts          # Main API router
│   │   ├── auth.ts         # Authentication routes
│   │   ├── chat.ts         # Chat/AI routes
│   │   ├── dashboard.ts    # Dashboard routes
│   │   ├── health.ts       # Health check routes
│   │   ├── imageRecognition.ts
│   │   ├── nutrition.ts    # Nutrition tracking routes
│   │   ├── recipes.ts      # Recipe routes
│   │   └── user.ts         # User profile routes
│   │
│   ├── utils/               # Utility functions
│   │   └── jwt.ts          # JWT helper functions
│   │
│   └── index.ts            # Server entry point
│
├── api/
│   └── index.js            # Vercel serverless entry
│
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment config
└── runMigration.cjs        # Database migration runner
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current user info

### User Profile (`/api/user`)

- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /health-profile` - Create/update health profile
- `GET /health-profile` - Get health profile

### Recipes (`/api/recipes`)

- `GET /` - Get all recipes (with pagination)
- `GET /:id` - Get recipe by ID
- `POST /generate` - Generate AI recipe
- `POST /save/:id` - Save recipe to user's collection
- `DELETE /save/:id` - Remove saved recipe

### Chat (`/api/chat`)

- `POST /` - Send message to AI assistant
- `GET /history` - Get chat history
- `DELETE /history` - Clear chat history

### Image Recognition (`/api/image-recognition`)

- `POST /analyze` - Analyze food image (multipart/form-data)

### Dashboard (`/api/dashboard`)

- `GET /stats` - Get user statistics
- `GET /recent-activity` - Get recent activities

### Nutrition (`/api/nutrition`)

- `GET /logs` - Get nutrition logs
- `POST /logs` - Create nutrition log
- `PUT /logs/:id` - Update nutrition log
- `DELETE /logs/:id` - Delete nutrition log

### Health Check (`/api/health`)

- `GET /` - Server health status

## 🔒 Authentication

### JWT Token Flow

1. **Registration/Login**: User credentials are validated and a JWT token is generated
2. **Token Storage**: Token is sent as HTTP-only cookie
3. **Protected Routes**: `authenticateToken` middleware validates the token
4. **Token Refresh**: Tokens expire after 7 days (configurable)

### Protected Route Example

```typescript
import { authenticateToken } from "./middleware/auth";

router.get("/protected", authenticateToken, (req, res) => {
  // req.user contains decoded JWT payload
  res.json({ user: req.user });
});
```

## 🤖 AI Integration

### Google Gemini AI

The server uses Google's Gemini AI for:

- Nutritional advice in chat
- Recipe generation
- Food image analysis
- Personalized recommendations

Example usage in controllers:

```typescript
import { generateRecipeWithAI } from "./controllers/recipesController";

// Generate recipe based on ingredients
const recipe = await generateRecipeWithAI({
  ingredients: ["chicken", "rice", "vegetables"],
  dietaryRestrictions: ["gluten-free"],
  cuisine: "asian",
});
```

## 📤 File Upload

File uploads are handled using Multer with memory storage. Images are then uploaded to Supabase Storage.

### Maximum File Size

- Single file: 5MB
- Supported formats: JPG, JPEG, PNG, GIF, WebP

## 🛡️ Security Features

- **Helmet**: Sets security-related HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **bcrypt**: Password hashing with salt rounds
- **JWT**: Secure token-based authentication
- **HTTP-only Cookies**: XSS protection
- **Input Validation**: Using Zod and express-validator
- **SQL Injection Protection**: Parameterized queries with pg

## 📊 Logging

Morgan is configured for HTTP request logging:

- Development: `dev` format (colored, concise)
- Production: `combined` format (Apache style)

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📦 Available Scripts

| Script         | Description                              |
| -------------- | ---------------------------------------- |
| `dev`          | Start development server with hot reload |
| `build`        | Compile TypeScript to JavaScript         |
| `start`        | Start production server                  |
| `vercel-build` | Build for Vercel deployment              |
| `lint`         | Run ESLint on TypeScript files           |

## 🌐 Deployment

### Vercel

The project includes Vercel configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel

Add all environment variables from `.env` in your Vercel project settings.

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Heroku

```bash
# Login
heroku login

# Create app
heroku create nutrizen-server

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set GEMINI_API_KEY=your-key

# Deploy
git push heroku main
```

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -U your_username -d nutrizen -c "SELECT version();"

# Check if database exists
psql -U your_username -l | grep nutrizen
```

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### TypeScript Errors

```bash
# Clear build directory
rm -rf dist/

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
npx tsc --showConfig
```

## 🔧 Database Migrations

### Creating a Migration

1. Create a new SQL file in `src/database/migrations/`
2. Name it with timestamp: `YYYY-MM-DD-description.sql`
3. Write your migration SQL
4. Run the migration:

```bash
psql -U your_username -d nutrizen -f src/database/migrations/your-migration.sql
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Add proper error handling
4. Validate all inputs
5. Document new endpoints
6. Write migration scripts for database changes

## 📄 License

ISC License - See main project LICENSE file

---

For more information, see the [main project README](../README.md)
