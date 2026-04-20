# FIFA World Culture Hub

Fullstack project organized into independent `frontend` and `backend` applications.

## Structure

```text
/
+-- frontend/
|   +-- package.json
|   +-- package-lock.json
|   +-- jsconfig.json
|   +-- next.config.js
|   +-- postcss.config.js
|   +-- tailwind.config.js
|   +-- public/
|   `-- src/
+-- backend/
|   +-- package.json
|   +-- tsconfig.json
|   `-- src/
+-- .gitignore
`-- README.md
```

## Frontend

The Next.js app now lives in [frontend/package.json](/c:/Users/Usuario/Downloads/Entrega%20Web/frontend/package.json:1) and its source code is under [frontend/src](/c:/Users/Usuario/Downloads/Entrega%20Web/frontend/src/app/page.js:1).

Run it with:

```bash
cd frontend
npm install
npm run dev
```

Default URL:

```text
http://localhost:3000
```

## Backend

The Express + TypeScript BFF lives in [backend/package.json](/c:/Users/Usuario/Downloads/Entrega%20Web/backend/package.json:1) and follows Clean Architecture inside [backend/src](/c:/Users/Usuario/Downloads/Entrega%20Web/backend/src/app.ts:1).

Run it with:

```bash
cd backend
npm install
npm run dev
```

Default URL:

```text
http://localhost:4000/api
```

## Notes

- `node_modules` should be installed separately inside `frontend/` and `backend/`.
- `frontend/.next` is generated automatically when the Next.js app runs.
- The old root-level `node_modules` and root-level `.next` are leftovers from the previous layout and can be removed safely after reinstalling dependencies inside each app.
