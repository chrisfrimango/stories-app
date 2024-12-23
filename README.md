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

# Runner / frontend
npx open cypress
```

### Test Data Structure

Test data is organized under `cypress/fixtures/testData/`:

- `users.json` - User test data
- `posts.json` - Blog post test data
- `categories.json` - Category test data

## Installation & Setup

1. Clone the repository:
   bash
   git clone [repo-url]
   cd stories_app

## Database Setup

2. Database Setup:

   - Install PostgreSQL if not already installed
   - Create a new database:

   bash
   psql -U postgres
   CREATE DATABASE your_db_name;

- Set up the database schema (two options):
  a. Using migration script:
  bash
  cd backend
  npm run migrate

  b. Manual setup:

  - Copy and execute the SQL code from `database/schema.sql`

3. Configure environment variables:
   - Create `.env` files in both frontend and backend directories:

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
VITE_UNSPLASH_ACCESS_KEY=key from unspash alt. skip unsplash and use fallback image.

4. Install dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

5. Start development servers:

```bash

Backend
cd backend && npm run dev

Frontend (in a new terminal)
cd frontend && npm run dev

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Posts
- `GET /api/posts` - List all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `GET /api/categories/:id` - Get category by ID
- `DELETE /api/categories/:id` - Delete category

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile/:id` - Update profile
- `DELETE /api/profile/:id` - Delete profile
- `PUT /api/profile/:id/change-password` - Change password


The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

```
