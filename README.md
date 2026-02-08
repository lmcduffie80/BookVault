# BookVault

Business Management CRM Platform - An all-in-one solution for managing clients, invoices, contracts, projects, and tasks.

## Features

- **Client Management**: Track and manage client information, contacts, and relationships
- **Invoice System**: Create, send, and track invoices with automatic calculations
- **Contract Management**: Manage client contracts and agreements
- **Project Management**: Organize projects with tasks and timelines
- **Task Management**: Track and prioritize tasks across projects
- **User Authentication**: Secure login with NextAuth.js
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, shadcn/ui
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- pnpm installed (`npm install -g pnpm`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BookVault
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start PostgreSQL with Docker:
```bash
pnpm db:up
```

5. Generate Prisma Client:
```bash
pnpm db:generate
```

6. Run database migrations:
```bash
pnpm db:migrate
```

7. Seed the database with sample data:
```bash
pnpm db:seed
```

8. Start the development server:
```bash
pnpm dev
```

9. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

After seeding the database, you can log in with:
- **Email**: demo@bookvault.com
- **Password**: password123

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm db:up` - Start PostgreSQL with Docker
- `pnpm db:down` - Stop PostgreSQL
- `pnpm db:generate` - Generate Prisma Client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio (database GUI)
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:reset` - Reset database

## Database Management

### Prisma Studio

To view and edit your database with a GUI:
```bash
pnpm db:studio
```

### pgAdmin

Access pgAdmin at [http://localhost:5050](http://localhost:5050):
- **Email**: admin@bookvault.com
- **Password**: admin123

## Project Structure

```
BookVault/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── dashboard/        # Dashboard-specific components
├── lib/                   # Utility functions
│   ├── api-client.ts     # API client helper
│   ├── auth.ts           # NextAuth configuration
│   ├── formatters.ts     # Formatting utilities
│   ├── invoice-utils.ts  # Invoice calculations
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # General utilities
│   └── validations.ts    # Zod schemas
├── prisma/                # Prisma configuration
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── types/                 # TypeScript types
└── docker-compose.yml     # Docker configuration

## Development Workflow

1. Start Docker PostgreSQL: `pnpm db:up`
2. Make schema changes in `prisma/schema.prisma`
3. Create migration: `pnpm db:migrate`
4. Update seed data in `prisma/seed.ts` if needed
5. Restart dev server: `pnpm dev`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
