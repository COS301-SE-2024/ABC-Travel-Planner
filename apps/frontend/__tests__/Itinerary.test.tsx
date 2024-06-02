import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Itinerary from '../app/itinerary/page';

describe('Itinerary Component', () => {
  it('should render the Itinerary component with title and description', () => {
    render(<Itinerary />);

    expect(screen.getByText('Your Itinerary')).toBeInTheDocument();
    expect(screen.getByText('Plan your trip with ease.')).toBeInTheDocument();
  });

  it('should have the correct class for the title', () => {
    render(<Itinerary />);

    const titleElement = screen.getByText('Your Itinerary');
    expect(titleElement).toHaveClass('text-2xl font-bold');
  });
});
