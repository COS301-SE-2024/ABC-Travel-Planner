import { render, screen } from '@testing-library/react';
import Booking from '../app/booking/page';
import '@testing-library/jest-dom';

describe('Booking Component', () => {
  it('renders Booking component with correct content', () => {
    render(<Booking />);
    
    const headingElement = screen.getByText('Book Your Trip');
    const paragraphElement = screen.getByText('Seamless booking for flights, hotels, and activities.');

    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
