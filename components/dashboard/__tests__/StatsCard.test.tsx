import { render, screen } from '@testing-library/react';
import { StatsCard } from '../StatsCard';
import { Users } from 'lucide-react';

describe('StatsCard Component', () => {
  const defaultProps = {
    title: 'Total Users',
    value: '1,234',
    icon: Users,
  };

  it('renders with required props', () => {
    render(<StatsCard {...defaultProps} />);
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<StatsCard {...defaultProps} description="+20.1% from last month" />);
    
    expect(screen.getByText('+20.1% from last month')).toBeInTheDocument();
  });

  it('renders without description', () => {
    render(<StatsCard {...defaultProps} />);
    
    const card = screen.getByText('Total Users').closest('div');
    expect(card).toBeInTheDocument();
  });

  it('displays different values', () => {
    const { rerender } = render(<StatsCard {...defaultProps} value="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();

    rerender(<StatsCard {...defaultProps} value="$12,345.67" />);
    expect(screen.getByText('$12,345.67')).toBeInTheDocument();
  });

  it('renders with different titles', () => {
    const { rerender } = render(<StatsCard {...defaultProps} title="Active Projects" />);
    expect(screen.getByText('Active Projects')).toBeInTheDocument();

    rerender(<StatsCard {...defaultProps} title="Pending Tasks" />);
    expect(screen.getByText('Pending Tasks')).toBeInTheDocument();
  });
});
