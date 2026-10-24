# Work Satthi

**Local skills. Trusted hands. Stronger communities.**

Work Satthi is a hyperlocal services marketplace concept for connecting customers with local service professionals.

## Frontend pages
- `index.html` — responsive home page and service overview.
- `login.html` — real account registration and login connected to the API.
- `dashboard.html` — edit account profile, search public worker profiles, create and cancel booking requests, and view personal booking history.
- `api.js` — public API base URL configuration. No secrets belong here.
- `profile.html` — customer / worker entry page.
- `backend/` — Node.js API and SQLite database.

## Backend features
- Account registration and login with bcrypt password hashing and signed JWT sessions.
- Customer and worker roles.
- Worker profiles, local-area and skill search.
- Authenticated booking requests, customer-only booking history and cancellation of pending requests.
- Service catalogue and contact form endpoint.
- Input validation, JSON body limits, Helmet security headers, CORS allow-list, and API/auth rate limits.
- SQLite storage. Use persistent disk storage in deployment or records can be lost when a service restarts/redeploys.

## Deploy the backend

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Het-Darji-1504/HackaThon)

This opens Render to review and deploy the `render.yaml` Blueprint. The current Blueprint uses a paid Starter web service and persistent disk, so review the displayed cost before confirming. I cannot create the service without approval in your Render account.
1. Create a Node web service connected to this repository (for example, on Render).
2. Set **Root Directory** to `backend`, **Build Command** to `npm install`, and **Start Command** to `npm start`.
3. Add environment variables:
   - `JWT_SECRET`: a unique private random string of at least 32 characters. Generate one locally; never commit it.
   - `CORS_ORIGINS`: `https://het-darji-1504.github.io,http://localhost:5500,http://127.0.0.1:5500` (edit to match your exact frontend origin).
   - `DATABASE_PATH`: path on a persistent disk, e.g. `/var/data/work-satthi.db`, after attaching a persistent disk mounted at `/var/data`.
4. Wait for the service to build, then test `https://YOUR-BACKEND-SERVICE.onrender.com/api/health` and `/api/services`.
5. Edit `api.js` and replace `https://YOUR-BACKEND-SERVICE.onrender.com` with your deployed backend URL. Commit the change. GitHub Pages then republishes the frontend.
6. Test signup/login, worker profile creation, worker search, and customer booking requests with separate test accounts.

Generate a secret using Node.js: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

## Run locally
Use Node.js 20+. From the repository root:
```bash
cd backend
npm install
cp .env.example .env
# Put a private JWT_SECRET in backend/.env
npm run dev
```
Serve the frontend through a local web server, then set `api.js` to `http://localhost:3000`. For local use, add `http://localhost:5500` (or your actual local frontend origin) to `CORS_ORIGINS`.

## API
- `GET /api/health`
- `GET /api/services?q=plumb&category=Repairs`
- `POST /api/auth/register` — name, email, password, role; workers must also provide area and service. Optional phone/rate.
- `POST /api/auth/login` — email and password.
- `GET /api/auth/me` — authenticated current user.
- `PUT /api/users/me` — update current user's profile.
- `GET /api/workers?q=plumb&area=Ahmedabad` — public worker listings; private email and phone are not exposed.
- `POST /api/bookings` — authenticated booking request.
- `GET /api/bookings/mine` — authenticated user's own booking history.
- `DELETE /api/bookings/:id` — cancel your own pending request.
- `POST /api/contact` — submit a contact message.

## Important limitations before public launch
This is a hackathon-ready starter, not a complete production marketplace. Booking requests are not confirmed until a human verifies worker availability. The current API does not include email verification/password reset, worker identity verification, in-app chat, payments, admin moderation, notifications, or automated booking assignment. JWTs are stored in browser localStorage, which is acceptable for a prototype but less robust than secure HttpOnly cookie sessions against XSS. Add tests, backups, monitoring, privacy/consent language, data-retention rules, and abuse handling before handling real customers. Never collect payment card details directly in this app.
