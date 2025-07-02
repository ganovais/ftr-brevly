# Brevly - Frontend

A modern and responsive link shortener frontend built with React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install
```

### Configuration

Create a `.env` file in the root directory and configure the backend URL:

```env
VITE_BACKEND_URL=http://localhost:3333
```

### Development

```bash
# Start development server
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React Router DOM** - Routing
- **Vite** - Build tool
