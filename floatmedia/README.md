# Float Media

Digital signage redefined. One dashboard. Every screen. From a single display to a global network.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** Anthropic Claude SDK
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
floatmedia/
├── src/
│   ├── app/              # Pages & layouts (App Router)
│   │   ├── page.tsx      # Landing page (/)
│   │   ├── for-franchises/
│   │   └── ...           # Dashboard pages
│   ├── components/       # Reusable UI components
│   ├── lib/              # Hooks & utilities
│   ├── services/         # AI & API services
│   └── types/            # TypeScript types
├── public/               # Static assets (images, videos)
└── prisma/               # Database schema (if used)
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for AI content generation |
| `DATABASE_URL` | PostgreSQL connection string (if using Prisma) |

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

### Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set root directory to `floatmedia`
4. Add environment variables
5. Deploy

### Docker

```bash
docker build -t floatmedia .
docker run -p 3000:3000 floatmedia
```

## License

Proprietary - Flot Media
