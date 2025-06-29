# Brevly - Link Shortener

A modern and responsive link shortener application built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ **Modern UI**: Clean and responsive design that works on both desktop and mobile
- 🔗 **Link Shortening**: Create custom short links with your preferred alias
- 📊 **Link Management**: View, copy, and delete your shortened links
- 📤 **CSV Export**: Export all your links to a CSV file
- 🔄 **Auto Redirect**: Automatic redirection from shortened links
- 💾 **Local Storage**: Links are saved locally for development/demo purposes
- 🎨 **Tailwind CSS**: Beautiful styling with Tailwind CSS v4
- 📱 **Responsive**: Works perfectly on all device sizes

## How to Use

### Creating a Short Link

1. Enter your **original URL** (e.g., `https://www.example.com/very-long-url`)
2. Choose a **custom short code** (e.g., `my-link`)
3. Click **"Salvar link"**
4. Your short link will be `http://localhost:5173/brev.ly/my-link`

### Managing Links

- **Copy Link**: Click the copy icon to copy the shortened URL to clipboard
- **Delete Link**: Click the trash icon to remove a link
- **Export CSV**: Click "Baixar CSV" to download all links as a spreadsheet

### Using Shortened Links

When someone visits `http://localhost:5173/brev.ly/your-code`, they will be automatically redirected to the original URL.

## Project Structure

```
src/
├── components/
│   ├── input.tsx           # Reusable input component with error handling
│   ├── link-form.tsx       # Form for creating new links
│   ├── links-table.tsx     # Table displaying all links
│   └── redirect-page.tsx   # Page that handles redirects
├── services/
│   └── api.ts             # API service for backend communication
├── assets/
│   └── brevly.svg         # Logo and icons
└── App.tsx                # Main application component
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React Router DOM** - Routing
- **Vite** - Build tool

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## API Integration

The app is designed to work with a backend API. You can modify the `API_BASE_URL` in `src/services/api.ts` to point to your backend server.

Expected API endpoints:
- `POST /api/links` - Create a new link
- `GET /api/links` - Get all links
- `GET /api/links/:shortCode` - Get link by short code (for redirects)
- `DELETE /api/links/:id` - Delete a link
- `GET /api/links/export` - Export links as CSV

## Design Features

The application follows the design specifications with:
- **Clean Layout**: Two-column layout with form on left, links table on right
- **Empty States**: Friendly messages when no links exist
- **Loading States**: Visual feedback during operations
- **Error Handling**: Clear error messages for validation and network issues
- **Mobile Responsive**: Stacks to single column on smaller screens
- **Professional Styling**: Consistent spacing, colors, and typography

## Local Development Notes

- Links are stored in `localStorage` for demo purposes
- The redirect functionality works for locally created links
- You can test the full flow by creating links and visiting them
- Port 5173 is used for the frontend (default Vite port)

Enjoy using Brevly! 🚀
