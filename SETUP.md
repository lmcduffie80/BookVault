# BookVault Setup Guide

## Quick Start

Follow these steps to get your BookVault CRM up and running:

### 1. Start PostgreSQL Database

```bash
pnpm db:up
```

This will start PostgreSQL and pgAdmin in Docker containers.

### 2. Generate Prisma Client

```bash
pnpm db:generate
```

This generates the TypeScript types and Prisma Client based on your schema.

### 3. Run Database Migrations

```bash
pnpm db:migrate
```

This creates all the necessary tables in your PostgreSQL database. When prompted for a migration name, you can use: `init`

### 4. Seed the Database

```bash
pnpm db:seed
```

This populates your database with sample data including:
- A demo user account
- Sample clients
- Sample invoices
- Sample projects and tasks
- Sample contracts

### 5. Start the Development Server

```bash
pnpm dev
```

### 6. Access the Application

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

### 7. Log In

Use these credentials to log in:
- **Email**: demo@bookvault.com
- **Password**: password123

## Database Management

### Prisma Studio (Recommended)

View and edit your database with a beautiful GUI:

```bash
pnpm db:studio
```

Opens at: [http://localhost:5555](http://localhost:5555)

### pgAdmin (Alternative)

Access pgAdmin at: [http://localhost:5050](http://localhost:5050)

Credentials:
- **Email**: admin@bookvault.com
- **Password**: admin123

To connect to PostgreSQL in pgAdmin:
1. Right-click "Servers" and select "Register" > "Server"
2. General tab: Name = "BookVault"
3. Connection tab:
   - Host: postgres (or localhost if connecting from outside Docker)
   - Port: 5432
   - Database: bookvault
   - Username: bookvault
   - Password: bookvault123

## Troubleshooting

### Port Already in Use

If you see an error that port 5432 or 5050 is already in use:

```bash
# Stop existing containers
pnpm db:down

# Or stop other PostgreSQL services
# On Mac:
brew services stop postgresql

# On Linux:
sudo systemctl stop postgresql
```

### Database Connection Issues

If the app can't connect to the database:

1. Check that Docker containers are running:
```bash
docker ps
```

2. Verify the DATABASE_URL in your `.env` file:
```
DATABASE_URL="postgresql://bookvault:bookvault123@localhost:5432/bookvault?schema=public"
```

3. Restart the containers:
```bash
pnpm db:down
pnpm db:up
```

### Reset Database

To start fresh:

```bash
pnpm db:reset
```

This will:
1. Drop all tables
2. Recreate tables from scratch
3. Run seed data

### Migration Issues

If migrations fail:

```bash
# Push schema directly (dev only)
pnpm db:push

# Or reset and try again
pnpm db:reset
```

## Next Steps

After setup, you can:

1. **Explore the Dashboard**: Navigate through Clients, Invoices, Contracts, Projects, and Tasks
2. **Add Your Data**: Create your own clients, invoices, and projects
3. **Customize**: Modify the code to fit your specific business needs
4. **Deploy**: When ready, deploy to Vercel, Railway, or your preferred platform

## Development Commands

```bash
# Start development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Format code
pnpm format

# Lint code
pnpm lint

# Database commands
pnpm db:up          # Start PostgreSQL
pnpm db:down        # Stop PostgreSQL
pnpm db:generate    # Generate Prisma Client
pnpm db:migrate     # Run migrations
pnpm db:seed        # Seed database
pnpm db:studio      # Open Prisma Studio
pnpm db:reset       # Reset database
pnpm db:push        # Push schema (dev only)
```

## Support

For issues or questions, please check:
- README.md for general information
- Prisma documentation: https://www.prisma.io/docs
- Next.js documentation: https://nextjs.org/docs
- NextAuth.js documentation: https://next-auth.js.org

Happy building! 🚀
