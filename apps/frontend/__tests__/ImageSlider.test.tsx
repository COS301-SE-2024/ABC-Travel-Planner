import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageSlider from '../app/destinations/ImageSlider';
import '@testing-library/jest-dom'

describe('ImageSlider Component', () => {
  const mockData = [{
    "location_id": "293740",
    "name": "South Africa",
    "description": "From the verdant Garden Route to the sub-tropical coast of KwaZulu-Natal, South Africa",
    "web_url": "https://www.tripadvisor.com/Tourism-g293740-South_Africa-Vacations.html?m=66827",
    "address_obj": {
      "address_string": "From the verdant Garden Route to the sub-tropical coast of KwaZulu-Natal, South Africa"
    },
    "ancestors": [],
    "latitude": "-30.958544",
    "longitude": "24.21163",
    "timezone": "Africa/Johannesburg",
    "see_all_photos": "https://www.tripadvisor.com/Tourism-g293740-m66827-South_Africa-Vacations.html#photos",
    "category": {
      "name": "geographic",
      "localized_name": "Geographic"
    },
    "subcategory": [
      {
        "name": "country",
        "localized_name": "Country"
      }
    ],
    "neighborhood_info": [],
    "awards": [],
    "image": "https://media-cdn.tripadvisor.com/media/photo-b/2560x500/15/4d/45/67/south-africa.jpg",
    "isFavourite": false
  }];

  it('renders with initial image', () => {
    const { getByAltText, getByText } = render(<ImageSlider favouriteDestinations={mockData}/>);
    const initialImage = getByAltText('Slide 0');
    const initialLabel = getByText('South Africa');
    const initialDescription = getByText('From the verdant Garden Route to the sub-tropical coast of KwaZulu-Natal, South Africa');

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
