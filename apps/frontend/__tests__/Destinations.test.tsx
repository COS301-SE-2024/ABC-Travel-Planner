import '@testing-library/jest-dom/expect'; 
import { render, screen } from '@testing-library/react';
import Destinations from '../app/destinations/page';

describe('Destinations Page', () => {
  it('renders without crashing', async () => {
    render(<Destinations />);
    expect(screen.getByText('Keep your favorite destinations close by!')).toBeInTheDocument();
  });

  it('renders destination cards', async () => {
    render(<Destinations />);
    
    const destinationCards = screen.getAllByTestId('destination-card');
    expect(destinationCards.length).toBeGreaterThan(0);
  });

});
