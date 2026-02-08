import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatNumber,
  formatPercent,
} from '../formatters';

describe('Formatter Functions', () => {
  describe('formatCurrency', () => {
    it('formats USD currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('formats different currencies', () => {
      expect(formatCurrency(1234.56, 'EUR')).toContain('1,234.56');
      expect(formatCurrency(1234.56, 'GBP')).toContain('1,234.56');
    });
  });

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const formatted = formatDate(date);
      expect(formatted).toContain('2024');
      expect(formatted).toContain('Jan');
    });

    it('handles string dates', () => {
      const formatted = formatDate('2024-06-20T12:00:00Z');
      expect(formatted).toContain('2024');
      expect(formatted).toContain('Jun');
    });
  });

  describe('formatDateTime', () => {
    it('formats date and time correctly', () => {
      const date = new Date('2024-01-15T14:30:00');
      const formatted = formatDateTime(date);
      expect(formatted).toMatch(/Jan(uary)?\s+15,\s+2024/);
      expect(formatted).toMatch(/2:30\s*PM/);
    });
  });

  describe('formatRelativeTime', () => {
    it('formats recent dates correctly', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    it('formats hours correctly', () => {
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago');
    });

    it('formats days correctly', () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1234)).toBe('1,234');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('formatPercent', () => {
    it('formats percentages correctly', () => {
      expect(formatPercent(50)).toBe('50%');
      expect(formatPercent(12.34, 2)).toBe('12.34%');
      expect(formatPercent(100)).toBe('100%');
      expect(formatPercent(0)).toBe('0%');
    });
  });
});
