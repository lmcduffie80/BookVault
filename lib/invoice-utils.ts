export interface InvoiceItem {
  quantity: number;
  unitPrice: number;
  total?: number;
}

export function calculateItemTotal(item: InvoiceItem): number {
  return item.quantity * item.unitPrice;
}

export function calculateSubtotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100);
}

export function calculateDiscount(subtotal: number, discountAmount: number): number {
  return Math.min(discountAmount, subtotal);
}

export function calculateTotal(
  subtotal: number,
  tax: number = 0,
  discount: number = 0
): number {
  return Math.max(0, subtotal + tax - discount);
}

export function generateInvoiceNumber(prefix: string = 'INV'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

export function isOverdue(dueDate: Date | string, status: string): boolean {
  if (status === 'PAID' || status === 'CANCELLED') return false;
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  return due < new Date();
}
