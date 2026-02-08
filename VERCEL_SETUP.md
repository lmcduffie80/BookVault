# Vercel Deployment Setup Guide

This guide will help you deploy BookVault CRM to Vercel.

## Prerequisites

- GitHub repository connected to Vercel
- PostgreSQL database (Vercel Postgres, Supabase, Neon, or Railway)
- Vercel account

## Step 1: Database Setup

You need a PostgreSQL database for production. Choose one of these options:

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Click "Create Database" and select "Postgres"
4. Follow the prompts to create your database
5. Vercel will automatically set the `DATABASE_URL` environment variable

### Option B: External PostgreSQL Provider

Popular options:
- **Neon** (https://neon.tech) - Serverless PostgreSQL
- **Supabase** (https://supabase.com) - PostgreSQL with additional features
- **Railway** (https://railway.app) - Full-stack platform
- **Render** (https://render.com) - PostgreSQL hosting

Get your connection string from your provider (format: `postgresql://username:password@host:port/database`)

## Step 2: Configure Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Your PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Generate with command below | Secret for NextAuth.js sessions |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your production URL |
| `NODE_ENV` | `production` | Node environment |

### Generate NEXTAUTH_SECRET

Run this command locally to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` value.

### Example Configuration

```
DATABASE_URL=postgresql://user:password@host.region.postgres.vercel-storage.com:5432/verceldb
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://bookvault.vercel.app
NODE_ENV=production
```

## Step 3: Configure Build Settings

In Vercel project settings, ensure these build configurations:

- **Framework Preset**: Next.js
- **Build Command**: `pnpm build` (or leave default)
- **Install Command**: `pnpm install` (or leave default)
- **Output Directory**: `.next` (default)
- **Node.js Version**: 18.x or later

## Step 4: Run Database Migrations

After your first deployment, you need to run database migrations.

### Option 1: Using Vercel CLI (Recommended)

Install Vercel CLI locally:

```bash
npm i -g vercel
```

Link your project and run migrations:

```bash
vercel link
vercel env pull .env.production
pnpm db:push
```

### Option 2: Manual Migration

1. Connect to your production database locally
2. Run the migration command:

```bash
DATABASE_URL="your-production-database-url" pnpm db:push
```

Or use Prisma Studio to set up your schema:

```bash
DATABASE_URL="your-production-database-url" pnpm db:studio
```

## Step 5: Deploy

### Automatic Deployment

Vercel automatically deploys when you push to your connected GitHub branch:

```bash
git push origin Maintenance
```

### Manual Deployment

You can also trigger deployments manually:

```bash
vercel --prod
```

Or use the "Redeploy" button in the Vercel dashboard.

## Step 6: Create Initial User

After successful deployment, you need to create your first user account:

1. Visit your deployed app: `https://your-app.vercel.app`
2. Go to `/auth/signup`
3. Create your admin account
4. Sign in at `/auth/signin`
5. Access the dashboard at `/dashboard`

## Troubleshooting

### Build Fails with "react-scripts not found"

This means Vercel didn't detect Next.js properly. Ensure:
- `vercel.json` exists in your project root
- `framework` is set to `"nextjs"`
- Redeploy after pushing the fix

### Database Connection Issues

Check that:
- `DATABASE_URL` is correctly formatted
- Database accepts connections from Vercel's IP range
- SSL is enabled if required: Add `?sslmode=require` to connection string

### Prisma Client Not Generated

If you see "Cannot find module '@prisma/client'":
- Ensure `postinstall` script is in package.json
- Check build logs to verify `prisma generate` ran
- Try redeploying

### Authentication Not Working

Verify:
- `NEXTAUTH_URL` matches your production URL (including https://)
- `NEXTAUTH_SECRET` is set and not empty
- Cookies are not blocked by browser

### Environment Variables Not Loading

- Environment variables are case-sensitive
- Restart deployment after adding new variables
- Check "Environment Variables" are set for "Production" environment

## Monitoring and Maintenance

### View Logs

Access real-time logs in Vercel dashboard:
- Go to your project
- Click on a deployment
- View "Build Logs" or "Function Logs"

### Database Management

Use Prisma Studio to manage data:

```bash
DATABASE_URL="your-production-url" pnpm db:studio
```

### Updating the Application

1. Make changes locally and test
2. Commit and push to GitHub
3. Vercel automatically deploys
4. Monitor deployment in dashboard

## Security Best Practices

1. **Never commit** `.env` files to Git
2. **Rotate secrets** regularly (especially `NEXTAUTH_SECRET`)
3. **Use strong passwords** for database
4. **Enable** Vercel's security features:
   - DDoS protection
   - SSL/TLS certificates (automatic)
   - Environment variable encryption (automatic)
5. **Review** deployment logs regularly

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [NextAuth.js Documentation](https://next-auth.js.org/)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review this guide
3. Consult Vercel support documentation
4. Check GitHub issues in the repository
