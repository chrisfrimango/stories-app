# Stories App

A full-stack blog application built with TypeScript, React, and Node.js where users can create, read, update, and delete blog posts.

## Features

- **Användarhantering**

  - 🔐 Registrering och inloggning
  - 👤 Profilhantering med CRUD-operationer
  - 🔑 Lösenordsändring
  - 🎫 JWT-baserad autentisering

- **Bloggfunktionalitet**

  - 📝 Skapa, läsa, uppdatera och ta bort inlägg
  - 🏷️ Kategorihantering
  - 🔍 Filtrering av inlägg
  - 🔄 Optimistisk UI-uppdatering

- **UI/UX**
  - 🎨 Material-UI komponenter
  - ✨ Modal-baserad interaktion
  - 📊 Context-baserad state management
  - 🔔 Alert system för användarfeedback
  - 📱 Responsiv design

## Tech Stack

### Frontend

- React 18 med TypeScript
- Material-UI v5
- TanStack Query (React Query) för datahantering
- Zod för validering
- Cypress för testing
- Context API för global state:
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

Testdata är organiserad under `cypress/fixtures/testData/`:

- `users.json` - Användartestdata
- `posts.json` - Blogginläggstestdata
- `categories.json` - Kategoritestdata

## API Endpoints

### Auth & Users

- `POST /api/auth/login` - Inloggning
- `POST /api/auth/register` - Registrering
- `GET /api/profile/:id` - Hämta profil
- `PUT /api/profile/:id` - Uppdatera profil
- `PUT /api/profile/:id/change-password` - Ändra lösenord
- `DELETE /api/profile/:id` - Ta bort konto

### Posts

- `GET /api/posts` - Lista alla inlägg
- `GET /api/posts/:id` - Hämta specifikt inlägg
- `POST /api/posts` - Skapa nytt inlägg
- `PUT /api/posts/:id` - Uppdatera inlägg
- `DELETE /api/posts/:id` - Ta bort inlägg

### Categories

- `GET /api/categories` - Lista kategorier
- `POST /api/categories` - Skapa kategori

## Installation & Setup

1. Klona repot:

```bash
git clone [repo-url]
cd stories_app
```

2. Installera dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

3. Konfigurera miljövariabler:

```env
# Backend (.env)
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   PORT=3000
JWT_SECRET=your_jwt_secret
PORT=3000

# Frontend (.env)
VITE_API_URL=http://localhost:3000/api
```

4. Starta utvecklingsservrar:

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

Applikationen kommer att finnas tillgänglig på:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Development

- Använd `npm run lint` för att köra linting
- Följ TypeScript typer och interfaces i `src/types/`
- Testa komponenter med Cypress runner
