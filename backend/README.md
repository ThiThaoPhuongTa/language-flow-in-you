# Backend

Node.js/Express backend with TypeScript.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Lint code
- `npm run lint:fix` - Lint and fix code

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
PORT=3001
NODE_ENV=development
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
