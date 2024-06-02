// apps/frontend/app/components/__tests__/Navbar.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar } from '../app/components/Navbar';

describe('Navbar', () => {
  it('renders the Navbar component', () => {
    render(<Navbar />);

    const homeLink = screen.getByText('Home');
    const searchLink = screen.getByText('Search');
    const destinationsLink = screen.getByText('Destinations');
    const itineraryLink = screen.getByText('Itinerary');
    const bookingLink = screen.getByText('Booking');
    const accountLink = screen.getByText('Account');

    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(destinationsLink).toBeInTheDocument();
    expect(itineraryLink).toBeInTheDocument();
    expect(bookingLink).toBeInTheDocument();
    expect(accountLink).toBeInTheDocument();
  });
});
