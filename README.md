# Stories App

A full-stack blog application built with TypeScript, React, and Node.js where users can create, read, update, and delete blog posts.

## Features

- **User Management**

  - 🔐 Registration and Login
  - 👤 Profile Management with CRUD Operations
  - 🔑 Password Change
  - 🎫 JWT-based Authentication

- **Blog Functionality**

  - 📝 Create, Read, Update and Delete Posts
  - 🏷️ Category Management
  - 🔍 Post Filtering
  - 🔄 Optimistic UI Updates

- **UI/UX**
  - 🎨 Material-UI Components
  - ✨ Modal-based Interaction
  - 📊 Context-based State Management
  - 🔔 Alert System for User Feedback
  - 📱 Responsive Design

## Tech Stack

### Frontend

- React 18 with TypeScript
- Material-UI v5
- TanStack Query (React Query) for data management
- Zod for validation
- Cypress for testing
- Context API for global state:
  - Alert Context
  - Modal Context
  - Auth Context
- Vite for build tooling

### Backend

- Node.js with Express
- TypeScript
- PostgreSQL database
- JWT for authentication
- Zod for validation

## Testing

### Cypress Tester

```bash
# Komponenttester
npm run cy:component

# E2E tester
npm run cy:e2e

# Öppna Cypress UI
npm run cy:open
```

### Test Data Structure

Test data is organized under `cypress/fixtures/testData/`:

- `users.json` - User test data
- `posts.json` - Blog post test data
- `categories.json` - Category test data

## API Endpoints

### Auth & Users

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registration
- `GET /api/profile/:id` - Get profile
- `PUT /api/profile/:id` - Update profile
- `PUT /api/profile/:id/change-password` - Change password
- `DELETE /api/profile/:id` - Delete account

### Posts

- `GET /api/posts` - List all posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Categories

- `GET /api/categories` - List categories
- `POST /api/categories` - Create category

## Installation & Setup

## Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
   bash
   psql -U postgres
   CREATE DATABASE your_db_name;

3. Run migrations (from backend directory):
   bash
   npm run migrate

4. Optional copy sql code from the schema and set it up manual

The database schema will be automatically created when you run the migrations. Make sure your PostgreSQL server is running and the credentials in your `.env` file match your local PostgreSQL setup.

## Frontend/backend Setup

4. Clone the repository:

```bash
git clone [repo-url]
cd stories_app
```

2. Install dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

3. Configure environment variables:

```env
# Backend (.env)
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   PORT=3000

# Frontend (.env)
VITE_API_URL=http://localhost:3000/api
```

4. Start development servers:

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Development

- Use `npm run lint` to run linting
- Follow TypeScript types and interfaces in `src/types/`
- Test components with Cypress runner
