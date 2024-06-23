import { render, screen } from '@testing-library/react';
import Booking from '../app/booking/page';
import '@testing-library/jest-dom';

describe('Booking Component', () => {
  it('renders Booking component with correct content', () => {
    render(<Booking />);
    
    const headingElement = screen.getByText('Book Your Trip');

    expect(headingElement).toBeInTheDocument();
  });
});
