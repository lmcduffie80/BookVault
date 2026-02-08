import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create a demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@bookvault.com' },
    update: {},
    create: {
      email: 'demo@bookvault.com',
      name: 'Demo User',
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log('Created user:', user.email);

  // Create sample clients
  const client1 = await prisma.client.create({
    data: {
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '(555) 123-4567',
      company: 'Acme Corp',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      status: 'ACTIVE',
      userId: user.id,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'TechStart Inc',
      email: 'hello@techstart.com',
      phone: '(555) 987-6543',
      company: 'TechStart Inc',
      address: '456 Tech Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
      status: 'ACTIVE',
      userId: user.id,
    },
  });

  console.log('Created clients:', client1.name, client2.name);

  // Create sample invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2024-001',
      clientId: client1.id,
      userId: user.id,
      issueDate: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      status: 'SENT',
      subtotal: 5000,
      tax: 500,
      discount: 0,
      total: 5500,
      notes: 'Web development services for Q1',
      items: {
        create: [
          {
            description: 'Website Development',
            quantity: 1,
            unitPrice: 3000,
            total: 3000,
          },
          {
            description: 'SEO Optimization',
            quantity: 1,
            unitPrice: 2000,
            total: 2000,
          },
        ],
      },
    },
  });

  console.log('Created invoice:', invoice.invoiceNumber);

  // Create sample project
  const project = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete redesign of corporate website',
      clientId: client2.id,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      status: 'IN_PROGRESS',
      budget: 15000,
    },
  });

  console.log('Created project:', project.name);

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Design homepage mockup',
        description: 'Create initial design concepts for homepage',
        projectId: project.id,
        userId: user.id,
        priority: 'HIGH',
        status: 'COMPLETED',
        dueDate: new Date('2024-01-15'),
      },
      {
        title: 'Develop frontend',
        description: 'Implement responsive frontend using React',
        projectId: project.id,
        userId: user.id,
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        dueDate: new Date('2024-02-28'),
      },
      {
        title: 'Setup deployment pipeline',
        description: 'Configure CI/CD for automated deployments',
        projectId: project.id,
        userId: user.id,
        priority: 'MEDIUM',
        status: 'TODO',
        dueDate: new Date('2024-03-15'),
      },
    ],
  });

  console.log('Created sample tasks');

  // Create sample contract
  const contract = await prisma.contract.create({
    data: {
      title: 'Annual Maintenance Agreement',
      clientId: client1.id,
      userId: user.id,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      value: 12000,
      status: 'ACTIVE',
      content: 'This agreement covers ongoing maintenance and support services.',
      notes: 'Renewable annually',
    },
  });

  console.log('Created contract:', contract.title);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
