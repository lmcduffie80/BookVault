import { clientSchema, invoiceItemSchema, invoiceSchema } from '../validations';
import { ClientStatus } from '@prisma/client';

describe('Validation Schemas', () => {
  describe('clientSchema', () => {
    it('validates correct client data', () => {
      const validClient = {
        name: 'Acme Corp',
        email: 'contact@acme.com',
        phone: '+1234567890',
        address: '123 Main St',
        city: 'New York',
        country: 'USA',
        status: ClientStatus.ACTIVE,
      };

      expect(() => clientSchema.parse(validClient)).not.toThrow();
    });

    it('requires name field', () => {
      const invalidClient = {
        email: 'contact@acme.com',
      };

      expect(() => clientSchema.parse(invalidClient)).toThrow();
    });

    it('validates email format', () => {
      const invalidClient = {
        name: 'Acme Corp',
        email: 'invalid-email',
      };

      expect(() => clientSchema.parse(invalidClient)).toThrow();
    });

    it('accepts optional fields', () => {
      const minimalClient = {
        name: 'Acme Corp',
      };

      expect(() => clientSchema.parse(minimalClient)).not.toThrow();
    });
  });

  describe('invoiceItemSchema', () => {
    it('validates correct invoice item', () => {
      const validItem = {
        description: 'Web Development',
        quantity: 10,
        unitPrice: 150,
        total: 1500,
      };

      expect(() => invoiceItemSchema.parse(validItem)).not.toThrow();
    });

    it('requires all fields', () => {
      const invalidItem = {
        description: 'Web Development',
      };

      expect(() => invoiceItemSchema.parse(invalidItem)).toThrow();
    });

    it('validates positive quantity', () => {
      const invalidItem = {
        description: 'Service',
        quantity: -5,
        unitPrice: 100,
        total: -500,
      };

      expect(() => invoiceItemSchema.parse(invalidItem)).toThrow();
    });

    it('validates positive unit price', () => {
      const invalidItem = {
        description: 'Service',
        quantity: 5,
        unitPrice: -100,
        total: -500,
      };

      expect(() => invoiceItemSchema.parse(invalidItem)).toThrow();
    });
  });

  describe('invoiceSchema', () => {
    it('validates correct invoice data', () => {
      const validInvoice = {
        invoiceNumber: 'INV-001',
        clientId: 'client-123',
        issueDate: new Date(),
        dueDate: new Date(),
        status: 'DRAFT',
        subtotal: 1000,
        tax: 100,
        discount: 50,
        total: 1050,
        items: [
          {
            description: 'Service 1',
            quantity: 5,
            unitPrice: 200,
            total: 1000,
          },
        ],
      };

      expect(() => invoiceSchema.parse(validInvoice)).not.toThrow();
    });

    it('requires invoice items', () => {
      const invalidInvoice = {
        invoiceNumber: 'INV-001',
        clientId: 'client-123',
        issueDate: new Date(),
        dueDate: new Date(),
        status: 'DRAFT',
        subtotal: 1000,
        tax: 100,
        discount: 50,
        total: 1050,
        items: [],
      };

      expect(() => invoiceSchema.parse(invalidInvoice)).toThrow();
    });
  });
});
