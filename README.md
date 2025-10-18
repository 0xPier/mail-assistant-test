# Mail Assistant

Multilingual outreach workspace for managing contacts, reusable file assets, email templates, and AI-assisted drafting. The application targets English, Indonesian, and Italian teams that need to personalize follow-ups, manage smart attachments, and coordinate bulk sending through a mail provider.

## Stack

- Next.js 15 (App Router, TypeScript, Turbopack)
- Tailwind CSS (v4) for styling
- `next-intl` for runtime i18n
- Prisma ORM with SQLite locally (PostgreSQL ready for production)
- React Query + Server Actions for data fetching/mutations
- UploadThing for file intake
- Resend SDK (placeholder) for mail provider integration
- Vitest + Testing Library + Playwright for testing

See `docs/architecture.md` for a deeper dive into the planned modules.

## Getting Started

```bash
yarn install
cp .env.example .env
# update required secrets: DATABASE_URL, RESEND_API_KEY, UPLOADTHING_TOKEN, ANTHROPIC_API_KEY

# Prisma client generation (requires network access to Prisma binaries)
yarn prisma:generate

# Create initial database and optional seed
yarn prisma:migrate --name init

# Run the development server
yarn dev
```

Visit `http://localhost:3000` to access the localized dashboard. The app redirects to `/en` by default; switch locales via the language selector in the top bar.

## Available Scripts

- `yarn dev` – start development server with Turbopack
- `yarn build` / `yarn start` – production build & launch
- `yarn lint` – run ESLint
- `yarn test` – execute Vitest unit tests
- `yarn test:e2e` – Playwright end-to-end tests
- `yarn prisma:generate`, `yarn prisma:migrate`, `yarn prisma:studio` – Prisma tooling

## Next Steps

1. Implement authentication & session-aware access to contacts/files/templates.
2. Build Prisma migrations & data access layer (contact CRUD, file metadata, template management, email jobs).
3. Integrate UploadThing and storage provider for file uploads.
4. Implement CSV import/export for contacts and connect templates to AI drafting workflow.
5. Wire multi-send to chosen ESP (Resend placeholder) and add background job orchestration.
6. Design intake form workflow (public + internal follow-up planner).
