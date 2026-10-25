# Work Satthi

**Local skills. Trusted hands. Stronger communities.**

Work Satthi is a hyperlocal services marketplace designed to connect customers with local professionals. It provides a place to discover services, explore worker profiles, and send booking requests.

## Features

- Customer and worker registration and login
- Worker profiles, profile editing, and worker search
- Service catalogue and service details
- Booking requests, customer booking history, and cancellation
- Worker experience and availability information
- Contact messages
- Community Watch India prototype for browsing and reporting local civic issues on an interactive map

Passwords are bcrypt-hashed, and public worker search omits email addresses and phone numbers. Booking requests remain pending until availability is confirmed.

> **Current limitation:** Online payments are not implemented. There is no checkout, payment gateway, or payment API.

## Project structure

- `index.html`, `services.html`, `login.html`, `profile.html`, `dashboard.html`, `about.html`, `404.html`: main static pages
- `community.html` and `community.js`: Community Watch India prototype
- `style.css`: shared site styling
- `script.js`, `services.js`, `login.js`, `dashboard.js`, `worker-registration.js`: frontend page behavior
- `assets/illustrations/` and `assets/services/`: illustrations and service-card images
- `api.js`: frontend API URL configuration; do not put secrets here
- `backend/`: Express API, SQLite database setup, tests, and backend instructions
- `scripts/check-site.js`: checks styling rules and local page references
- `supabase/` and SQL files: database-related scripts and migrations

## Getting started

### Requirements

- Node.js 20 or later
- A local static server for serving the frontend files

### Set up the backend

From the repository root, run:

```sh
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, set a private random `JWT_SECRET` of at least 32 characters, and then start the development server:

```sh
npm run dev
```

Do not commit your `.env` file or expose secrets. For local API use, set `window.WORK_SATTHI_API_URL` in `api.js` to `http://localhost:3000`. Set `CORS_ORIGINS` to the exact origin serving the frontend.

## Run checks

From the `backend/` directory:

```sh
npm run lint
npm test
npm run check:site
```

Tests use a temporary SQLite database and do not contact production services.

## Deployment status

The GitHub Actions workflow publishes the static site to GitHub Pages after CI passes on `main`. No backend deployment URL is configured and no backend hosting is provisioned.

To connect a self-hosted backend, configure `JWT_SECRET`, an exact `CORS_ORIGINS` allow-list, and a persistent `DATABASE_PATH`. Set the API origin in `api.js` and verify `/api/health` and `/api/services`. Hosting and storage costs depend on the provider; this project does not create a service or select paid resources.

Back up the SQLite database regularly and verify restores before relying on it. Keep the database directory on persistent storage in deployed environments, as ephemeral disks can lose data during restarts or redeployments.

## Community Watch India — prototype

The `community.html` page provides an interactive India map, category-specific markers, browser geolocation after a user action, a report form, map filters, and recent-report cards.

**Important limitations:** Reports are stored in the current browser's `localStorage`. They do not sync across devices, are not submitted to public authorities, and can be cleared by the browser. The optional photo field is not uploaded. This prototype is not an official reporting or emergency service.

The map uses Leaflet and OpenStreetMap tiles. A production release still needs a deployed API with persistent report storage, image-upload rules, abuse/spam moderation, a privacy and retention policy, and appropriate access controls. No backend endpoint is configured for community reports yet.

## Security and remaining work

JWTs currently live in browser `localStorage`, making them readable by JavaScript and vulnerable if the page has an XSS flaw. The API uses seven-day bearer tokens; logout clears the browser token but cannot revoke a copied token. For production, consider secure, HttpOnly, SameSite cookies with CSRF protection and a deployment architecture that supports them.

Email verification, password recovery, identity verification, moderation, notifications, data retention, backup and restore drills, monitoring, and independent security review are not implemented.

## Contributors

- **Het Darji**
- **Arman Ganja**
- **Jeet Gangajaliya**
- **Samarthsinh Chauhan**
