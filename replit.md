# CreatorSpace - Student Content Creation Platform

## Overview

CreatorSpace is a full-stack web application designed as a content creation platform for students. It enables student creators to manage their social media content, schedule posts across multiple platforms, organize media assets, and collaborate with peers. The application features a mobile-first design with a modern, dark-themed UI optimized for the creator workflow.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing instead of React Router

**UI Component Library**
- Radix UI primitives for accessible, unstyled component foundations
- shadcn/ui component system (New York style variant) for pre-built, customizable components
- Tailwind CSS v4 (using `@import` syntax) for utility-first styling with custom CSS variables for theming
- Framer Motion for animations and transitions
- Lucide React for consistent iconography

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Custom API client wrapper for centralized HTTP request handling
- React Hook Form with Zod resolvers for form state and validation

**Design System**
- Dark-first theme with vivid purple primary color (hsl(265 89% 66%)) and cyan accents
- Custom CSS variables for consistent theming across components
- Mobile-first responsive design with max-width container (max-w-md) for phone optimization
- Custom fonts: Inter for body text, Outfit for display/headings

### Backend Architecture

**Runtime & Server Framework**
- Node.js with ES modules (type: "module" in package.json)
- Express.js for HTTP server and API routes
- TypeScript for type safety across the entire backend

**Authentication & Session Management**
- Express-session for session-based authentication
- MemoryStore for session storage (development) with ability to swap to connect-pg-simple for production PostgreSQL-backed sessions
- Bcrypt for password hashing with salt rounds of 10
- Session cookie configuration with httpOnly and secure flags

**API Architecture**
- RESTful API design with route registration pattern
- Centralized route handler in `server/routes.ts`
- Request validation using Zod schemas with zod-validation-error for user-friendly error messages
- Session-based user authentication protecting API endpoints

**Build & Deployment**
- Custom build script using esbuild for server bundling
- Selective dependency bundling (allowlist) to optimize cold start times by reducing file system calls
- Separate client and server build processes
- Static file serving for production builds

### Data Storage

**Database**
- PostgreSQL as the primary relational database
- Drizzle ORM for type-safe database queries and schema management
- Database connection pooling via node-postgres (pg)

**Schema Design**
- Users table: Authentication and profile information (id, username, password hash, NIM, major)
- Scheduled Posts table: Content planning with platform, type, status, and scheduling information
- Media table: Asset management with user relationship and creation timestamps
- UUID generation using PostgreSQL's `gen_random_uuid()` for primary keys
- Cascade deletion on user foreign key relationships

**Type Safety**
- Drizzle-Zod integration for automatic schema-to-Zod validation conversion
- Shared TypeScript types between client and server via `shared/schema.ts`
- Separation of insert schemas (omitting auto-generated fields) from select types

### External Dependencies

**Development Tools**
- Replit-specific plugins for development environment integration:
  - `@replit/vite-plugin-runtime-error-modal` for error overlays
  - `@replit/vite-plugin-cartographer` for code navigation
  - `@replit/vite-plugin-dev-banner` for development mode indicators
- Custom meta images plugin for OpenGraph/Twitter card image URL rewriting

**UI Libraries**
- 25+ Radix UI component primitives for complex UI patterns (dialogs, dropdowns, tooltips, etc.)
- cmdk for command palette functionality
- vaul for drawer/bottom sheet components
- date-fns for date manipulation and formatting

**Database & Validation**
- drizzle-orm and drizzle-kit for database operations and migrations
- Zod for runtime type validation and schema definitions
- zod-validation-error for converting Zod errors to readable messages

**Session & Security**
- express-session with MemoryStore (development) or connect-pg-simple (production)
- bcrypt for cryptographic password hashing
- Session secrets configured via environment variables

**Styling & Animation**
- TailwindCSS with @tailwindcss/vite plugin
- Autoprefixer for CSS vendor prefixing
- class-variance-authority for variant-based component styling
- tailwindcss-animate for animation utilities
- tw-animate-css integration

**Additional Features**
- Path aliases configured in tsconfig and vite config for cleaner imports (`@/`, `@shared/`, `@assets/`)
- Environment-based configuration with separate development and production modes
- Database migration support via drizzle-kit push command