# NutriZen Client (Frontend)

The frontend application for NutriZen, built with React, TypeScript, and modern web technologies.

## 🛠️ Tech Stack

- **Framework:** React 18.3.1
- **Language:** TypeScript 5.8.3
- **Build Tool:** Vite 5.4.19
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** @tanstack/react-query 5.83.0
- **Routing:** React Router DOM 6.30.1
- **Form Handling:** React Hook Form 7.61.1
- **Validation:** Zod 3.25.76
- **Icons:** Lucide React 0.462.0
- **Charts:** Recharts 2.15.4
- **Theme:** next-themes 0.3.0
- **Date Utilities:** date-fns 3.6.0

## 📋 Prerequisites

- Node.js 18 or higher
- Bun (recommended) or npm/yarn
- Running NutriZen backend server

## 🚀 Installation

```bash
# Install dependencies using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

## ⚙️ Configuration

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000
```

For production, update the URL to your deployed backend:

```env
VITE_API_URL=https://your-backend-url.com
```

## 🏃 Development

Start the development server:

```bash
# Using Bun
bun run dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### Hot Module Replacement (HMR)

Vite provides fast HMR for instant feedback during development. Changes to your code will be reflected immediately in the browser.

## 🏗️ Build

Build the application for production:

```bash
# Production build
bun run build

# Development build (with source maps)
bun run build:dev

# Preview production build
bun run preview
```

The build output will be in the `dist/` directory.

## 📁 Project Structure

```
client/
├── src/
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AIChatPreview.tsx
│   │   ├── CTA.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── DataVisualization.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── GenerateRecipeDialog.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RecipeDetailDialog.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx # Authentication state management
│   │
│   ├── data/               # Static data and constants
│   │   └── defaultRecipes.ts
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx  # Mobile detection hook
│   │   └── use-toast.ts    # Toast notifications hook
│   │
│   ├── lib/                # Utility functions
│   │   ├── auth.ts         # Authentication utilities
│   │   └── utils.ts        # General utilities
│   │
│   ├── pages/              # Page components
│   │   ├── About.tsx
│   │   ├── Analytics.tsx
│   │   ├── Chat.tsx
│   │   ├── Contact.tsx
│   │   ├── Dashboard.tsx
│   │   ├── HealthProfileOnboarding.tsx
│   │   ├── ImageRecognition.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── Recipes.tsx
│   │   ├── Settings.tsx
│   │   └── Signup.tsx
│   │
│   ├── App.tsx             # Main app component with routing
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # Vite type definitions
│
├── public/                 # Public static assets
│   └── robots.txt
│
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # App-specific TypeScript config
├── tsconfig.node.json      # Node-specific TypeScript config
├── vercel.json             # Vercel deployment configuration
└── vite.config.ts          # Vite configuration
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) built on top of Radix UI. All UI components are located in `src/components/ui/`.

### Adding New UI Components

```bash
# Using the shadcn CLI
npx shadcn-ui@latest add <component-name>

# Example: Add a new button component
npx shadcn-ui@latest add button
```

## 🔌 API Integration

API calls are managed using React Query. The base API URL is configured via the `VITE_API_URL` environment variable.

Example API call:

```typescript
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["recipes"],
  queryFn: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`);
    return response.json();
  },
});
```

## 🎯 Key Features

### Authentication

- JWT-based authentication with HTTP-only cookies
- Protected routes using `ProtectedRoute` component
- Auth context for global authentication state

### Theme Support

- Dark/Light mode toggle
- System theme detection
- Persistent theme preference

### Responsive Design

- Mobile-first approach
- Custom `useMobile` hook for responsive behavior
- Tailwind CSS breakpoints

### Forms

- React Hook Form for form management
- Zod schema validation
- Type-safe form handling

## 🧪 Code Quality

### Linting

```bash
# Run ESLint
bun run lint

# Fix auto-fixable issues
bun run lint --fix
```

### TypeScript

The project uses strict TypeScript configuration. Type checking is performed during build.

```bash
# Type check
tsc --noEmit
```

## 📦 Available Scripts

| Script      | Description                                 |
| ----------- | ------------------------------------------- |
| `dev`       | Start development server with HMR           |
| `build`     | Build for production                        |
| `build:dev` | Build with development mode and source maps |
| `preview`   | Preview production build locally            |
| `lint`      | Run ESLint on all files                     |

## 🌐 Deployment

### Vercel (Recommended)

The project includes a `vercel.json` configuration file for easy deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel

Add the following environment variable in your Vercel project settings:

- `VITE_API_URL`: Your backend API URL

### Other Platforms

Build the project and serve the `dist/` directory:

```bash
bun run build
```

The `dist/` directory can be deployed to:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🔧 Configuration Files

### Vite Config (`vite.config.ts`)

- Path aliases (`@` -> `./src`)
- SWC plugin for faster builds
- Development server settings

### Tailwind Config (`tailwind.config.ts`)

- Custom color schemes
- Theme extensions
- Plugin configurations

### TypeScript Config

- `tsconfig.json`: Base configuration
- `tsconfig.app.json`: App-specific settings
- `tsconfig.node.json`: Node environment settings

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework with custom configuration.

### CSS Variables

Theme colors and spacing defined in `index.css`.

### Component Styles

- Component-scoped styles using CSS modules
- Global styles in `index.css`
- Tailwind utility classes

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port.

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules bun.lockb
bun install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Type Errors

Ensure all TypeScript dependencies are installed and up to date:

```bash
bun install @types/node @types/react @types/react-dom
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [React Router Documentation](https://reactrouter.com/)
- [React Query Documentation](https://tanstack.com/query/latest)

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Add proper error handling
4. Test responsive design on multiple devices
5. Update documentation for new features

## 📄 License

ISC License - See main project LICENSE file

---

For more information, see the [main project README](../README.md)
