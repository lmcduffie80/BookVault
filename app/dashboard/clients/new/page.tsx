'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api-client';

export default function NewClientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
      status: 'ACTIVE',
    };

    try {
      await api.post('/clients', data);
      router.push('/dashboard/clients');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create client');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Client</h1>
        <p className="text-muted-foreground mt-2">
          Create a new client record
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" name="zipCode" />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" defaultValue="USA" />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Client'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
