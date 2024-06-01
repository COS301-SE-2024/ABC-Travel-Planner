import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageSlider from '../app/destinations/ImageSlider';
import '@testing-library/jest-dom'

describe('ImageSlider Component', () => {
  it('renders with initial image', () => {
    const { getByAltText, getByText } = render(<ImageSlider />);
    const initialImage = getByAltText('Slide 0');
    const initialLabel = getByText('India');
    const initialDescription = getByText('Discover the rich culture and history of India.');

    expect(initialImage).toBeInTheDocument();
    expect(initialLabel).toBeInTheDocument();
    expect(initialDescription).toBeInTheDocument();
  });

  /*it('navigates to next and previous slides', () => {
    const { getByText } = render(<ImageSlider />);
    const nextButton = getByRole('button', { name: 'Next Slide' });
    const prevButton = getByRole('button', { name: 'Previous Slide' });

    // Click next button and verify
    fireEvent.click(nextButton);
    expect(getByText('Japan')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(getByText('Spain')).toBeInTheDocument();
    
    // Click prev button and verify
    fireEvent.click(prevButton);
    expect(getByText('Japan')).toBeInTheDocument();
    fireEvent.click(prevButton);
    expect(getByText('India')).toBeInTheDocument();
  });*/
});
