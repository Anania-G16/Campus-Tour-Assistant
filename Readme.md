[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org) [![Vite](https://img.shields.io/badge/Vite-%5E5-646cff?logo=vite&logoColor=white)](https://vitejs.dev) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) [![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)](https://nodejs.org) [![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com) [![Supabase](https://img.shields.io/badge/Supabase-2-00abff?logo=supabase&logoColor=white)](https://supabase.com) [![Postgres](https://img.shields.io/badge/Postgres-15-316192?logo=postgres&logoColor=white)](https://www.postgresql.org) [![Leaflet](https://img.shields.io/badge/Leaflet-1.9-4DBF00?logo=leaflet&logoColor=white)](https://leafletjs.com)

# Campus Tour Assistant 

A lightweight Campus Tour Assistant with a React + Vite frontend and an Express backend using Supabase for data storage. It provides a searchable campus map, building details, an admin panel for managing buildings, and feedback collection.

---

## Features
- Browse campus buildings with search and category filters
- Building details and Leaflet map integration
- Admin UI for adding, editing, and deleting buildings
- Feedback form and admin feedback review
- Image upload support (stored under backend `uploads/`)

---

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Leaflet, Axios
- Backend: Node.js, Express
- Database: Supabase (Postgres via `@supabase/supabase-js`)
- Auth: JWT for admin login/registration
- File uploads: multer (served from `/uploads`)

---

## Project Structure (high level)
- `Backend/` — Express API, models, controllers, uploads
- `campus-tour-ui/` — Vite + React frontend
  - `src/components/` — UI components
  - `src/pages/` — pages (Admin, Home, BuildingDetails, etc.)
  - `src/context/StoreContext.jsx` — API base URL and global state

---

## Prerequisites
- Node.js (14+)
- npm (or yarn)
- Supabase project (or Postgres compatible DB)

Ensure your Supabase instance has tables used by the app: `admins`, `buildings`, `feedback`.

---

## Environment variables
Create a `.env` file in `Backend/` with at least:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_or_service_key
JWT_SECRET=a_strong_jwt_secret
PORT=3000   # optional
```

> Frontend currently uses `http://localhost:3000` as the backend base in `campus-tour-ui/src/context/StoreContext.jsx`. For deployment, update that or use `VITE_` env vars.

---

##  Setup & Run

Backend
```bash
cd Backend
npm install
# Create .env and add SUPABASE_URL, SUPABASE_KEY, JWT_SECRET
npm start       # runs nodemon app.js (dev)
# or for production:
node app.js
```

Test DB connection (optional):
```bash
node test_db.js
```

Frontend
```bash
cd campus-tour-ui
npm install
npm run dev     # start dev server (vite)
npm run build   # build for production
npm run preview # preview the production build
npm run lint    # run eslint (dev)
```

---

## API Reference (quick with examples)

Base URL: `http://localhost:3000`

Auth
- POST `/api/user/login` — body: `{ "email": "admin@example.com", "password": "secret" }`
  - Success response (200):
```json
{ "success": true, "token": "<jwt>", "admin": { "admin_id": 1, "username": "admin", "email": "admin@example.com" } }
```
- POST `/api/user/register` — body: `{ "username": "admin", "email": "admin@example.com", "password": "secret" }`
  - Success response (201):
```json
{ "success": true, "message": "Admin registered successfully", "token": "<jwt>", "admin": { "admin_id": 2, "username": "admin", "email": "admin@example.com" } }
```

Buildings
- GET `/api/building` — optional query: `?search=...&category=...`
  - Success response (200):
```json
{ "success": true, "buildings": [ { "id": 1, "name": "Science Hall", "category": "Academic", "description": "...", "images": "science.jpg" } ] }
```
- GET `/api/building/:id` — returns one building
- POST `/api/building` — multipart/form-data (file field name: `images`) + other building fields
  - Example (curl):
```bash
curl -X POST http://localhost:3000/api/building \
  -F "name=New Library" \
  -F "category=Libraries" \
  -F "description=Modern library" \
  -F "images=@./library.jpg"
```
- PUT `/api/building/:id` — update a building (multipart/form-data allowed)
- DELETE `/api/building/:id` — delete a building

Feedback
- POST `/api/feedback` — body: `{ "subject": "Suggestion", "comment": "..." }`
- GET `/api/feedback` — list feedback
- DELETE `/api/feedback/:id` — remove feedback

---

## Schema notes
The app expects Supabase tables like `buildings`, `admins`, and `feedback`. Typical fields (examples):
- buildings: `id`, `name`, `category`, `description`, `images`, `lat`, `lng`, `hours`, `location`, `tags` (array), `floorinfo` (json)
- admins: `admin_id`, `username`, `email`, `password` (hashed)
- feedback: `feedback_id`, `subject`, `comment`, `created_at`

---

##  Contributing
See `CONTRIBUTING.md` for contribution guidelines.

---

## 🧾 License
This project is available under the MIT license — see `LICENSE`.