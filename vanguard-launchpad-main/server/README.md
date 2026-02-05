# Vanguard Launchpad Backend

This backend powers the Vanguard marketing website admin experience. It exposes secure admin APIs for uploading YouTube video projects and public APIs for consumption by the marketing frontend.

## Tech Stack

- Node.js + Express.js
- MongoDB with Mongoose ODM
- JWT authentication
- RESTful routing
- Zod-based request validation

## Project Structure

```
server/
  src/
    app.js               # Express app configuration
    server.js            # HTTP server bootstrap + DB connection
    routes.js            # Root router wiring
    config/
      env.js             # Environment variable loading + defaults
      database.js        # MongoDB connection helper
    middleware/
      authMiddleware.js  # JWT authentication guard
      requireAdmin.js    # Role-based authorization guard
      validateRequest.js # Zod validation wrapper
      errorMiddleware.js # 404 + error handling
    modules/
      auth/
        admin.model.js
        auth.controller.js
        auth.service.js
        auth.routes.js
        auth.validation.js
      video/
        video.model.js
        video.service.js
        video.controller.js
        video.validation.js
        video.routes.js
    utils/
      asyncHandler.js
      errorResponse.js
      extractYoutubeId.js
      token.js
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create an `.env` file** based on `.env.example`
   ```ini
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/vanguard_launchpad
   JWT_SECRET=super-secure-secret
   JWT_EXPIRES_IN=1d
   DEFAULT_ADMIN_EMAIL=admin@example.com
   DEFAULT_ADMIN_PASSWORD=changeMe123!
   DEFAULT_ADMIN_NAME=Site Admin
   ```

3. **Start the backend**
   ```bash
   npm run server:dev
   ```

4. **Health check**
   Visit `GET http://localhost:5000/health`.

## Authentication Flow

- Admins authenticate with **email + password** using `POST /api/auth/login`.
- On success, the response includes a JWT token which must be attached as a `Bearer` token for admin endpoints.
- `authMiddleware` validates the JWT and `requireAdmin` enforces the admin role.

## API Reference

### POST /api/auth/login

Request:
```json
{
  "email": "admin@example.com",
  "password": "changeMe123!"
}
```
Response `200`:
```json
{
  "token": "<jwt>",
  "admin": {
    "id": "671fb486ed30b935604dcfaf",
    "email": "admin@example.com",
    "name": "Site Admin",
    "role": "admin"
  }
}
```

### GET /api/videos
Returns **published** videos sorted by newest first.

Response `200`:
```json
[
  {
    "id": "671fb64ded30b935604dcfb7",
    "title": "Trading Desk Overview",
    "description": "Quick tour of our dashboard",
    "youtubeVideoId": "dQw4w9WgXcQ",
    "createdAt": "2026-01-28T18:45:05.432Z"
  }
]
```

### Admin Video Endpoints
All under `/api/admin/videos` and require a `Bearer <token>` header.

#### GET /api/admin/videos
Lists all projects (published + unpublished).

#### POST /api/admin/videos
Create a project.
```json
{
  "title": "New Vanguard Reel",
  "description": "30-second hype reel",
  "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "isPublished": true
}
```
Response `201` returns the persisted project (with `youtubeVideoId`).

#### GET /api/admin/videos/:id
Fetch a single project by MongoDB ObjectId.

#### PATCH /api/admin/videos/:id
Update any subset of fields. Send only the properties you want to change.

#### DELETE /api/admin/videos/:id
Removes a project. Responds with `204 No Content`.

## Validation & Error Handling

- Payloads are validated with Zod via `validateRequest` middleware.
- Invalid inputs respond with `400` and a `details` array in non-production environments.
- Unauthenticated or unauthorized access responds with `401` or `403` respectively.

## Utility: YouTube ID Extraction

`extractYoutubeId` normalizes different YouTube URL formats (`watch?v=`, `youtu.be/`, `embed/`, `shorts/`) to the canonical 11-character `youtubeVideoId` stored in the database. Frontend embeds videos at:
```
https://www.youtube.com/embed/{youtubeVideoId}
```

## Default Admin Bootstrap

If `DEFAULT_ADMIN_EMAIL` and `DEFAULT_ADMIN_PASSWORD` are provided, a default admin is created on server startup. Passwords are hashed with `bcrypt`.

## Testing & Linting

- Run unit tests (frontend only for now): `npm test`
- Run linting: `npm run lint`

Extend with backend tests (e.g., Vitest + Supertest) as needed.
