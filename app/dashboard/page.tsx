'use client';

import { useEffect, useState } from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Users, FileText, FolderKanban, CheckSquare } from 'lucide-react';
import { api } from '@/lib/api-client';

interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalInvoices: number;
  pendingInvoices: number;
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  pendingTasks: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeClients: 0,
    totalInvoices: 0,
    pendingInvoices: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalTasks: 0,
    pendingTasks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [clientsRes, invoicesRes, projectsRes, tasksRes] = await Promise.all([
          api.get<{ clients: any[] }>('/clients'),
          api.get<{ invoices: any[] }>('/invoices'),
          api.get<{ projects: any[] }>('/projects'),
          api.get<{ tasks: any[] }>('/tasks'),
        ]);

        setStats({
          totalClients: clientsRes.clients.length,
          activeClients: clientsRes.clients.filter((c) => c.status === 'ACTIVE').length,
          totalInvoices: invoicesRes.invoices.length,
          pendingInvoices: invoicesRes.invoices.filter(
            (i) => i.status === 'SENT' || i.status === 'OVERDUE'
          ).length,
          totalProjects: projectsRes.projects.length,
          activeProjects: projectsRes.projects.filter((p) => p.status === 'IN_PROGRESS').length,
          totalTasks: tasksRes.tasks.length,
          pendingTasks: tasksRes.tasks.filter(
            (t) => t.status === 'TODO' || t.status === 'IN_PROGRESS'
          ).length,
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your business management platform
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Clients"
          value={stats.totalClients}
          icon={Users}
          description={`${stats.activeClients} active`}
        />
        <StatsCard
          title="Invoices"
          value={stats.totalInvoices}
          icon={FileText}
          description={`${stats.pendingInvoices} pending`}
        />
        <StatsCard
          title="Projects"
          value={stats.totalProjects}
          icon={FolderKanban}
          description={`${stats.activeProjects} in progress`}
        />
        <StatsCard
          title="Tasks"
          value={stats.totalTasks}
          icon={CheckSquare}
          description={`${stats.pendingTasks} pending`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <a
              href="/dashboard/clients/new"
              className="block text-sm text-primary hover:underline"
            >
              + Add New Client
            </a>
            <a
              href="/dashboard/invoices/new"
              className="block text-sm text-primary hover:underline"
            >
              + Create Invoice
            </a>
            <a
              href="/dashboard/projects/new"
              className="block text-sm text-primary hover:underline"
            >
              + Start New Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
