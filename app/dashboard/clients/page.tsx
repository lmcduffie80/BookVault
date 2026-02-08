'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api-client';
import { formatDate } from '@/lib/formatters';

interface Client {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  status: string;
  createdAt: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await api.get<{ clients: Client[] }>('/clients');
        setClients(res.clients);
      } catch (error) {
        console.error('Failed to load clients:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadClients();
  }, []);

  if (isLoading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground mt-2">
            Manage your client relationships
          </p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Link key={client.id} href={`/dashboard/clients/${client.id}`}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{client.name}</CardTitle>
                {client.company && (
                  <p className="text-sm text-muted-foreground">{client.company}</p>
                )}
              </CardHeader>
              <CardContent>
                {client.email && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {client.email}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      client.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {client.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(client.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {clients.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No clients yet</p>
            <Link href="/dashboard/clients/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Client
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
