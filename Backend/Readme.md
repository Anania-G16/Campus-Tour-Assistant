# Campus Tour Assistant — Backend


## 🔧 Tech stack

- **Node.js** (>=14)
- **Express**
- **MongoDB** (via Mongoose)
- **dotenv** for environment variables
- **express-validator** for request validation

---

## 🚀 Quick Start

1. Install dependencies

```bash
cd Backend
npm install
```

2. Create a `.env` file in `Backend/` (see Environment Variables below)

3. Run the server

```bash
# development
node app.js


The server defaults to port `3000` (or the port from `PORT` env var).

---

## ⚙️ Environment Variables

Create a `.env` at `Backend/.env` with at least:

```
Url=<your_mongodb_connection_string>
PORT=3000
```

- `Url`: MongoDB connection string (required). The code uses `process.env.Url`.
- `PORT`: optional, defaults to `3000`.

---

## 📁 Project Structure

- `app.js` — application entry (creates `Server` and starts listening).
- `models/server.js` — Express Server wrapper (sets middlewares and port).
- `route/auth.js` — authentication routes (currently `/api/auth/login`).
- `controller/` — request handlers (some are TODO/empty).
- `db/connector.js` — MongoDB connection (uses dotenv).
- `models/` — Mongoose models: `Building_Data.js`, `Feedback.js`, etc.

---

## ✅ How to Contribute

- Implement missing controllers (e.g., `controller/login.js`) and wire routes into `models/server.js`.
- Add tests and input validation where appropriate.
- Improve `Building` model (more fields: location, description, images, tags, etc.)

---

## 📝 TODOs
- [ ] Finish `Building schema` 
- [ ] Finish `login` controller and authentication logic
- [ ] Wire routes in `Server.routes()` (currently commented out)
- [ ] Add CRUD endpoints for buildings
- [ ] Add feedback submission endpoints
- [ ] Add documentation for Frontend integration


