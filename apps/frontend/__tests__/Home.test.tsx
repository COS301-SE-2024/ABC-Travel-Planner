/*import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/home/page';
import DestinationCard from '../app/home/DestinationCard';

jest.mock('../app/home/DestinationCard', () => jest.fn(() => <div>Destination Card</div>));

const mockGetData = jest.fn();

jest.mock('../app/home/page', () => ({
  ...jest.requireActual('../app/home/page'),
  getData: () => mockGetData(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    mockGetData.mockResolvedValue({
      data: [
        { location_id: 1, name: 'Test Destination 1', image: 'image1.jpg' },
        { location_id: 2, name: 'Test Destination 2', image: 'image2.jpg' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await waitFor(() => render(<Home />));
    expect(screen.getByText('Destination Card')).toBeInTheDocument();
  });

  it('fetches and displays destinations', async () => {
    await waitFor(() => render(<Home />));

    // Check if the mock function was called
    expect(mockGetData).toHaveBeenCalledTimes(1);

    // Check if the DestinationCard components are rendered
    expect(screen.getAllByText('Destination Card').length).toBe(2);
  });
});*/
