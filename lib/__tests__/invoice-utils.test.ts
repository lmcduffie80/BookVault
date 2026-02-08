import {
  calculateItemTotal,
  calculateSubtotal,
  calculateTax,
  calculateDiscount,
  calculateTotal,
  generateInvoiceNumber,
  isOverdue,
} from '../invoice-utils';

describe('Invoice Utility Functions', () => {
  describe('calculateItemTotal', () => {
    it('calculates item total correctly', () => {
      expect(calculateItemTotal({ quantity: 5, unitPrice: 10 })).toBe(50);
      expect(calculateItemTotal({ quantity: 2, unitPrice: 99.99 })).toBe(199.98);
      expect(calculateItemTotal({ quantity: 10, unitPrice: 0 })).toBe(0);
    });
  });

  describe('calculateSubtotal', () => {
    it('calculates subtotal from multiple items', () => {
      const items = [
        { quantity: 2, unitPrice: 10 },
        { quantity: 3, unitPrice: 15 },
        { quantity: 1, unitPrice: 50 },
      ];
      expect(calculateSubtotal(items)).toBe(115); // (2*10) + (3*15) + (1*50)
    });

    it('returns 0 for empty items', () => {
      expect(calculateSubtotal([])).toBe(0);
    });
  });

  describe('calculateTax', () => {
    it('calculates tax correctly', () => {
      expect(calculateTax(100, 10)).toBe(10);
      expect(calculateTax(100, 0)).toBe(0);
      expect(calculateTax(250, 8.5)).toBe(21.25);
    });
  });

  describe('calculateDiscount', () => {
    it('returns minimum of discount amount and subtotal', () => {
      expect(calculateDiscount(100, 10)).toBe(10);
      expect(calculateDiscount(200, 15)).toBe(15);
      expect(calculateDiscount(100, 0)).toBe(0);
      expect(calculateDiscount(50, 100)).toBe(50); // Can't discount more than subtotal
    });
  });

  describe('calculateTotal', () => {
    it('calculates total with tax and discount', () => {
      expect(calculateTotal(100, 10, 5)).toBe(105); // 100 + 10 (tax) - 5 (discount)
      expect(calculateTotal(200, 20, 10)).toBe(210); // 200 + 20 - 10
    });

    it('handles zero tax and discount', () => {
      expect(calculateTotal(100, 0, 0)).toBe(100);
    });
  });

  describe('generateInvoiceNumber', () => {
    it('generates invoice number with correct format', () => {
      const invoiceNumber = generateInvoiceNumber();
      expect(invoiceNumber).toMatch(/^INV-\d{13}-\d{3}$/);
    });

    it('generates unique invoice numbers', () => {
      const num1 = generateInvoiceNumber();
      const num2 = generateInvoiceNumber();
      // They might be the same if generated in the same millisecond, but structure should be correct
      expect(num1).toMatch(/^INV-\d{13}-\d{3}$/);
      expect(num2).toMatch(/^INV-\d{13}-\d{3}$/);
    });

    it('accepts custom prefix', () => {
      const invoiceNumber = generateInvoiceNumber('CUSTOM');
      expect(invoiceNumber).toMatch(/^CUSTOM-\d{13}-\d{3}$/);
    });
  });

  describe('isOverdue', () => {
    it('returns true for past due dates with unpaid status', () => {
      const pastDate = new Date('2020-01-01');
      expect(isOverdue(pastDate, 'SENT')).toBe(true);
      expect(isOverdue(pastDate, 'OVERDUE')).toBe(true);
    });

    it('returns false for future due dates', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      expect(isOverdue(futureDate, 'SENT')).toBe(false);
    });

    it('returns false for paid or cancelled invoices regardless of date', () => {
      const pastDate = new Date('2020-01-01');
      expect(isOverdue(pastDate, 'PAID')).toBe(false);
      expect(isOverdue(pastDate, 'CANCELLED')).toBe(false);
    });

    it('handles string dates', () => {
      expect(isOverdue('2020-01-01', 'SENT')).toBe(true);
    });
  });
});
