# 🥗 NutriZen

A modern, AI-powered nutrition and wellness application that helps users track their nutrition, discover recipes, and maintain a healthy lifestyle through intelligent insights and personalized recommendations.

## ✨ Features

- 🔐 **Secure Authentication** - User registration and login with JWT-based authentication
- 👤 **Health Profile Management** - Personalized health profiles with dietary preferences and goals
- 📊 **Analytics Dashboard** - Visual insights into your nutrition and health metrics
- 🍳 **Recipe Discovery** - Browse and search through a curated collection of healthy recipes
- 🤖 **AI-Powered Chat** - Get personalized nutrition advice powered by Google Gemini AI
- 📸 **Image Recognition** - Analyze food images to get nutritional information
- 🎨 **Dark/Light Mode** - Beautiful UI with theme support
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** React Query (@tanstack/react-query)
- **Routing:** React Router v6
- **Form Handling:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Charts:** Recharts

### Backend

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT with bcrypt
- **AI Integration:** Google Generative AI (Gemini)
- **Cloud Storage:** Supabase
- **File Upload:** Multer
- **Security:** Helmet, CORS
- **Logging:** Morgan

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- Bun (for frontend) or npm/yarn
- PostgreSQL (v14 or higher)
- A Google AI API key for Gemini
- A Supabase account (optional, for cloud storage)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nutrizen.git
cd nutrizen
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
```

Configure your `.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/nutrizen

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Google AI (Gemini)
GEMINI_API_KEY=your-gemini-api-key

# Supabase (optional)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
```

#### Database Setup

```bash
# Create the database
createdb nutrizen

# Run migrations
npm run migrate
# Or manually run: psql -d nutrizen -f src/database/schema.sql
```

#### Start the Backend Server

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client

# Install dependencies (using Bun)
bun install

# Or using npm
npm install

# Create a .env file
cp .env.example .env
```

Configure your `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

#### Start the Frontend Development Server

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

The application will run on `http://localhost:5173`

## 📁 Project Structure

```
nutrizen/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main application component
│   ├── public/            # Static assets
│   └── package.json
│
└── server/                # Backend application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Route controllers
    │   ├── database/      # Database schema and migrations
    │   ├── middleware/    # Express middleware
    │   ├── routes/        # API routes
    │   ├── utils/         # Utility functions
    │   └── index.ts       # Server entry point
    └── package.json
```

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### User Profile

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/health-profile` - Create/update health profile

### Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes/generate` - Generate AI recipe

### Chat

- `POST /api/chat` - Send message to AI assistant
- `GET /api/chat/history` - Get chat history

### Image Recognition

- `POST /api/image-recognition/analyze` - Analyze food image

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

### Health

- `GET /api/health` - Health check endpoint

## 🎨 Available Scripts

### Frontend (client/)

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint
```

### Backend (server/)

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Frontend (Vercel)

The frontend is configured for deployment on Vercel:

```bash
cd client
vercel deploy
```

### Backend (Vercel/Railway/Heroku)

The backend can be deployed to various platforms:

**Vercel:**

```bash
cd server
vercel deploy
```

**Environment variables needed:**

- All variables from `.env` file
- Ensure `DATABASE_URL` points to your production database

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- CORS configuration
- Helmet security headers
- Input validation and sanitization
- SQL injection protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- [Soham156](https://github.com/Soham156) - Server and Client Development

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Supabase](https://supabase.com/) for backend services

## 📞 Support

For support, email repository owner or open an issue in the repository.

## 🐛 Known Issues

- Image recognition requires active internet connection
- AI responses may vary based on API availability

## 🗺️ Roadmap

- [ ] Meal planning features
- [ ] Social features (share recipes, follow users)
- [ ] Mobile app (React Native)
- [ ] Barcode scanning
- [ ] Integration with fitness trackers
- [ ] Multi-language support
- [ ] Advanced analytics and insights

---

Made with ❤️ by the NutriZen Team
