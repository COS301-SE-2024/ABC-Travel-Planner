import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reviews from '../app/reviews/page';

describe('Reviews Component', () => {
  it('should render the Reviews component with title and description', () => {
    render(<Reviews />);

    expect(screen.getByText('User Reviews')).toBeInTheDocument();
    expect(screen.getByText('Read reviews from other travelers.')).toBeInTheDocument();
  });

  it('should have the correct class for the title', () => {
    render(<Reviews />);

    const titleElement = screen.getByText('User Reviews');
    expect(titleElement).toHaveClass('text-2xl font-bold');
  });
});
