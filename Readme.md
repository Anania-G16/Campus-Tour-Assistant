# Campus Tour Assistant 🏫🗺️

A lightweight Campus Tour Assistant with a React + Vite frontend and an Express backend using Supabase for data storage. It provides a searchable campus map, building details, an admin panel for managing buildings, and feedback collection.

---

## 🚀 Features
- Browse campus buildings with search and category filters
- Building details and Leaflet map integration
- Admin UI for adding, editing, and deleting buildings
- Feedback form and admin feedback review
- Image upload support (stored under backend `uploads/`)

---

## 🧩 Tech Stack
- Frontend: React (Vite), Tailwind CSS, Leaflet, Axios
- Backend: Node.js, Express
- Database: Supabase (Postgres via `@supabase/supabase-js`)
- Auth: JWT for admin login/registration
- File uploads: multer (served from `/uploads`)

---

## 📁 Project Structure (high level)
- `Backend/` — Express API, models, controllers, uploads
- `campus-tour-ui/` — Vite + React frontend
  - `src/components/` — UI components
  - `src/pages/` — pages (Admin, Home, BuildingDetails, etc.)
  - `src/context/StoreContext.jsx` — API base URL and global state

---

## ⚙️ Prerequisites
- Node.js (14+)
- npm (or yarn)
- Supabase project (or Postgres compatible DB)

Ensure your Supabase instance has tables used by the app: `admins`, `buildings`, `feedback`.

---

## 🔧 Environment variables
Create a `.env` file in `Backend/` with at least:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_or_service_key
JWT_SECRET=a_strong_jwt_secret
PORT=3000   # optional
```

> Frontend currently uses `http://localhost:3000` as the backend base in `campus-tour-ui/src/context/StoreContext.jsx`. For deployment, update that or use `VITE_` env vars.

---

## 🛠️ Setup & Run

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

## 🔌 API Reference (quick with examples)

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

## 🧩 Schema notes
The app expects Supabase tables like `buildings`, `admins`, and `feedback`. Typical fields (examples):
- buildings: `id`, `name`, `category`, `description`, `images`, `lat`, `lng`, `hours`, `location`, `tags` (array), `floorinfo` (json)
- admins: `admin_id`, `username`, `email`, `password` (hashed)
- feedback: `feedback_id`, `subject`, `comment`, `created_at`

---

## 📦 Deployment (brief)
Frontend
- Deploy to Vercel or Netlify using the `campus-tour-ui` build (`npm run build`). Make sure to set any necessary environment variables for API URL in the deployment settings (or use Vite `VITE_` env vars).

Backend
- Deploy to Render / Fly / Heroku / Railway. Ensure `SUPABASE_URL`, `SUPABASE_KEY`, and `JWT_SECRET` are configured in the environment. Also ensure your service allows static file serving so `/uploads` remains available (or migrate uploads to object storage for production).

DNS/Proxy
- If using a custom domain, route frontend to the hosting provider and point API to your backend host. Enable HTTPS.

---

## 📝 Notes & Tips
- Images uploaded via the backend are stored in `Backend/uploads/buildings` and served at `/uploads/`.
- Admin UI is available in the frontend (`/admin`) — register an admin via `/api/user/register` then login to use admin features.
- To change the backend base URL in the frontend, update `url` in `campus-tour-ui/src/context/StoreContext.jsx` or refactor to use env vars.

---

## 🤝 Contributing
See `CONTRIBUTING.md` for contribution guidelines.

---

## 🧾 License
This project is available under the MIT license — see `LICENSE`.


