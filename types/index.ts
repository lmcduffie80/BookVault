import { Prisma } from '@prisma/client';

// User types
export type User = Prisma.UserGetPayload<{}>;
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    clients: true;
    invoices: true;
    contracts: true;
    tasks: true;
  };
}>;

// Client types
export type Client = Prisma.ClientGetPayload<{}>;
export type ClientWithRelations = Prisma.ClientGetPayload<{
  include: {
    user: true;
    invoices: true;
    contracts: true;
    projects: true;
  };
}>;

// Invoice types
export type Invoice = Prisma.InvoiceGetPayload<{}>;
export type InvoiceWithRelations = Prisma.InvoiceGetPayload<{
  include: {
    client: true;
    user: true;
    items: true;
    payments: true;
  };
}>;

export type InvoiceItem = Prisma.InvoiceItemGetPayload<{}>;

// Payment types
export type Payment = Prisma.PaymentGetPayload<{}>;
export type PaymentWithInvoice = Prisma.PaymentGetPayload<{
  include: {
    invoice: true;
  };
}>;

// Contract types
export type Contract = Prisma.ContractGetPayload<{}>;
export type ContractWithRelations = Prisma.ContractGetPayload<{
  include: {
    client: true;
    user: true;
  };
}>;

// Project types
export type Project = Prisma.ProjectGetPayload<{}>;
export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    client: true;
    tasks: true;
  };
}>;

// Task types
export type Task = Prisma.TaskGetPayload<{}>;
export type TaskWithRelations = Prisma.TaskGetPayload<{
  include: {
    user: true;
    project: true;
  };
}>;

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
