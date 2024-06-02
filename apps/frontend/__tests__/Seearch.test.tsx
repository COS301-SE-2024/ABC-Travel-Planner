import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../app/search/page';

describe('Search Component', () => {
  it('should render the search component with title and subtitle', () => {
    render(<Search />);
    
    expect(screen.getByText('Search at your Convenience!')).toBeInTheDocument();
    expect(screen.getByText('Click on an icon below to filter your search and provide better results')).toBeInTheDocument();
  });

  it('should update selectedTopic state and add selected class on button click', () => {
    render(<Search />);

    const flightsButton = screen.getByText('Flights');
    const staysButton = screen.getByText('Stays');
    const carRentalsButton = screen.getByText('Car Rentals');
    const attractionsButton = screen.getByText('Attractions');
    const airportTaxisButton = screen.getByText('Airport Taxis');

    fireEvent.click(flightsButton);
    expect(flightsButton).toHaveClass('search-button-selected');
    expect(screen.getByPlaceholderText('Search for flights')).toBeInTheDocument();

    fireEvent.click(staysButton);
    expect(staysButton).toHaveClass('search-button-selected');
    expect(screen.getByPlaceholderText('Search for stays')).toBeInTheDocument();

    fireEvent.click(carRentalsButton);
    expect(carRentalsButton).toHaveClass('search-button-selected');
    expect(screen.getByPlaceholderText('Search for carRentals')).toBeInTheDocument();

    fireEvent.click(attractionsButton);
    expect(attractionsButton).toHaveClass('search-button-selected');
    expect(screen.getByPlaceholderText('Search for attractions')).toBeInTheDocument();

    fireEvent.click(airportTaxisButton);
    expect(airportTaxisButton).toHaveClass('search-button-selected');
    expect(screen.getByPlaceholderText('Search for airportTaxis')).toBeInTheDocument();
  });

  it('should display search input and button when a topic is selected', () => {
    render(<Search />);

    const flightsButton = screen.getByText('Flights');
    fireEvent.click(flightsButton);

    expect(screen.getByPlaceholderText('Search for flights')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();  // The button with the FaSearch icon
  });
});
