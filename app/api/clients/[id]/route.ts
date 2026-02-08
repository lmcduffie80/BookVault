import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { clientSchema } from '@/lib/validations';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const client = await prisma.client.findUnique({
      where: {
        id,
        userId: (session.user as any).id,
      },
      include: {
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        contracts: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        projects: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ client });
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = clientSchema.parse(body);
    const { id } = await params;

    const client = await prisma.client.update({
      where: {
        id,
        userId: (session.user as any).id,
      },
      data: validatedData,
    });

    return NextResponse.json({ client });
  } catch (error: any) {
    console.error('Error updating client:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.client.delete({
      where: {
        id,
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting client:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
