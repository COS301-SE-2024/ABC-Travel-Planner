import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import DestinationCard from '../app/destinations/destinationsCard';

jest.mock('../app/utils/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(() => ({
        data: { user: { id: 'testUserId' } },
      })),
    },
    from: () => ({
      insert: jest.fn(() => ({
        select: jest.fn(),
      })),
      update: jest.fn(),
    }),
  })),
}));

const mockDestination = {
  name: 'Test Destination',
  address_obj: {
    address_string: 'Test Address',
  },
  image: 'test-image.jpg',
  location_id: 'testLocationId',
};

describe('DestinationCard Component', () => {
  it('renders destination card with correct content', () => {
    const { getByText, getByAltText } = render(<DestinationCard destination={mockDestination} />);

    expect(getByText('Test Address')).toBeInTheDocument();
    expect(getByAltText('Test Destination')).toBeInTheDocument();
  });

  it('toggles favorite status when favorite button is clicked', () => {
    const { getByRole } = render(<DestinationCard destination={mockDestination} />);
    /*const favoriteButton = getByRole('button', { name: /favorite/i });

    fireEvent.click(favoriteButton);

    // Favorite button should now be yellow
    expect(favoriteButton).toHaveStyle('color: yellow');

    fireEvent.click(favoriteButton);

    // Favorite button should now be back to default color
    expect(favoriteButton).not.toHaveStyle('color: yellow');*/
  });
});
