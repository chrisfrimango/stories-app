# Stories App

A full-stack blog application built with TypeScript, React, and Node.js where users can create, read, update, and delete blog posts.

## Features

- 🔐 User Authentication (Register/Login)
- 👤 User Profile Management
- 📝 Blog Post Creation and Management
- 🏷️ Category Management
- 🎨 Responsive Material-UI Design
- ✨ Real-time Form Validation
- 🔄 Optimistic Updates
- 🧪 Comprehensive Test Coverage

## Tech Stack

### Frontend

- React with TypeScript
- Material-UI for styling
- React Query for state management
- React Hook Form for form handling
- Zod for validation
- Cypress for testing
- Vite for build tooling

### Backend

- Node.js with Express
- TypeScript
- PostgreSQL database
- JWT for authentication
- Zod for validation

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stories_app
   ```

2. **Set up environment variables**

   Create `.env` files in both frontend and backend directories:

   Backend `.env`:

   ```env
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

   Frontend `.env`:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Set up the database**

   ```bash
   # From the backend directory
   npm run migrate
   ```

5. **Start the development servers**

   In separate terminal windows:

   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm run dev
   ```

   The application will be available at:

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Testing

### Frontend Tests

bash
Run component tests
npm run test:component
Run E2E tests
npm run test:e2e
Run tests with coverage
npm run cypress:coverage

### Backend Tests

bash
Run tests
npm test

## API Endpoints

### Authentication

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account
- `PUT /api/users/:id/change-password` - Change password

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

## Project Structure

stories_app/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── utils/
│ │ ├── validation/
│ │ └── types/
│ ├── cypress/
│ └── public/
└── backend/
├── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ ├── utils/
│ ├── validation/
│ └── types/
└── tests/
