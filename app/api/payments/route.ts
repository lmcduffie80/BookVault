import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { paymentSchema } from '@/lib/validations';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('invoiceId');

    const where: any = {};

    if (invoiceId) {
      where.invoiceId = invoiceId;
    }

    const payments = await prisma.payment.findMany({
      where,
      orderBy: { paymentDate: 'desc' },
      include: {
        invoice: {
          include: {
            client: true,
          },
        },
      },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = paymentSchema.parse(body);

    // Verify invoice belongs to user
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: validatedData.invoiceId,
        userId: (session.user as any).id,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const payment = await prisma.payment.create({
      data: {
        ...validatedData,
        paymentDate: new Date(validatedData.paymentDate),
      },
      include: {
        invoice: {
          include: {
            client: true,
          },
        },
      },
    });

    // Update invoice status if fully paid
    const totalPayments = await prisma.payment.aggregate({
      where: { invoiceId: validatedData.invoiceId },
      _sum: { amount: true },
    });

    if (totalPayments._sum.amount && totalPayments._sum.amount >= invoice.total) {
      await prisma.invoice.update({
        where: { id: validatedData.invoiceId },
        data: { status: 'PAID' },
      });
    }

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating payment:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
