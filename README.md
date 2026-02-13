# Enterprise Management System

This repository contains a full-stack web application for managing construction sites and related workflows. The system is designed to be an internal tool for managing the lifecycle of a project from sales through construction completion, including handling shipments, customer requests, document management, notifications, and production planning.

## Features

* Credentials-based authentication with JWT cookies.
* Role‑based access control (RBAC) for internal teams and external customers.
* Dashboard with filtering, searching and state tabs (sales, contract signed, construction in progress, completed).
* Site detail pages with tabs for overview, shipments, notes, requests and documents.
* Workflow buttons to transition a site through sales → contract → construction → completed states.
* Production planning page for the production team to input planned volumes and view actual shipment totals.
* Mock SMS provider with logging for dispatch notifications.
* Audit logging for critical actions.

## Getting Started

### Prerequisites

* Node.js 20.x
* npm 8+ (comes with Node.js)
* PostgreSQL database (locally or on Render)

### Installation

1. Clone this repository and install dependencies:

   ```bash
   git clone <your-repo-url>
   cd enterprise-management-system
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the environment variables:

   ```bash
   cp .env.example .env
   # Edit .env and set DATABASE_URL, AUTH_SECRET, etc.
   ```

3. Generate the Prisma client and run the initial migration. This will create the required tables in your PostgreSQL database:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

4. Seed the database with an initial administrator account using the credentials specified in `.env`:

   ```bash
   npm run seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser to `http://localhost:3000`. The application will redirect you to the login page.

### Running Migrations

Schema changes should be applied via Prisma migrations. To create a new migration in your local environment, run:

```bash
npx prisma migrate dev --name <migration-name>
```

This command generates a migration file under `prisma/migrations/` and updates your development database. Commit the generated migration files to version control so that they can be deployed on Render.

### Production Deployment (Render)

This project is configured for deployment on [Render](https://render.com). A `render.yaml` file is provided to describe the service and environment. To deploy:

1. Create a new PostgreSQL database on Render. Copy the **Internal Database URL** into the `DATABASE_URL` environment variable of your web service.

2. Create a new **Web Service** on Render and connect it to your GitHub repository. Use the following build and start commands:

   * **Build Command:**

     ```
     npm install && npx prisma generate && npx prisma migrate deploy && npm run build
     ```

   * **Start Command:**

     ```
     npm run start
     ```

3. Set the environment variables for your service:
   - `DATABASE_URL` – Render internal database URL.
   - `AUTH_SECRET` – a long random string for signing JWTs.
   - `ADMIN_DEFAULT_EMAIL` – initial admin email (used by seed script).
   - `ADMIN_DEFAULT_PASSWORD` – initial admin password (used by seed script).
   - `SALT_ROUNDS` – bcrypt salt rounds (default `10`).
   - `SMS_PROVIDER_KEY` – dummy key used by the mock SMS provider.

4. Deploy the service. Render will automatically run the migration using `prisma migrate deploy` and build the Next.js application.

## Contributing

Pull requests are welcome. Please ensure any contributions follow the existing code style and include appropriate migrations and tests.

## License

This project is licensed under the MIT license.