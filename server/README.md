# NutriZen Server

Backend API server for the NutriZen nutrition tracking application.

## Tech Stack

- Node.js + Express
- TypeScript
- ESM (ES Modules)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
copy .env.example .env
```

3. Update the `.env` file with your configuration.

### Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in .env)

### Build

Build for production:
```bash
npm run build
```

### Production

Run the production server:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Check server status

### Nutrition
- `GET /api/nutrition` - Get nutrition data
- `POST /api/nutrition/analyze` - Analyze nutrition intake

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/search` - Search recipes
- `GET /api/recipes/:id` - Get recipe by ID

### Chat
- `POST /api/chat` - Send message to AI nutrition assistant

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   └── index.ts        # Application entry point
├── dist/               # Compiled JavaScript (generated)
├── .env                # Environment variables
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Development Notes

- The server uses ES Modules (type: "module")
- TypeScript is compiled to ESNext with Node resolution
- All imports should use the `.js` extension for ESM compatibility
- Hot reload is enabled in development mode using `tsx`

## Next Steps

1. Add database integration (MongoDB/PostgreSQL)
2. Implement authentication/authorization
3. Integrate AI API (OpenAI) for chat functionality
4. Add input validation with Zod
5. Implement rate limiting
6. Add comprehensive error handling
7. Write unit and integration tests
