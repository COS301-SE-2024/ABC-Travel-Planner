import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterCard from '../app/search/searchCard';
import { getRatingColor, getPricePlaceholder, generatePrice } from '../app/search/searchCard';

const place = {
  id: "ChIJyR2OqEB-lR4RRfBDzOLMzZM",
  accessibilityOptions: null,
  displayName: "Hennops Hiking Trail & Mtb Trail",
  formattedAddress: "R511, Pretoria, 0001, South Africa",
  paymentOptions: null,
  plusCode: {
    compoundCode: "6X3Q+52 Pretoria, South Africa",
    globalCode: "5G696X3Q+52"
  },
  priceLevel: null,
  rating: 4.6,
  userRatingCount: 4484,
  websiteURI: "http://www.hennopstrails.co.za/",
  editorialSummary: "Picturesque hiking, biking & offroad trails on farmland with picnic & BBQ areas & swimming pools.",
  goodForChildren: true,
  Fg: {
    id: "ChIJyR2OqEB-lR4RRfBDzOLMzZM",
    accessibilityOptions: null,
    displayName: "Hennops Hiking Trail & Mtb Trail",
    formattedAddress: "R511, Pretoria, 0001, South Africa",
    paymentOptions: null,
    plusCode: {
      compoundCode: "6X3Q+52 Pretoria, South Africa",
      globalCode: "5G696X3Q+52"
    },
    priceLevel: null,
    rating: 4.6,
    types: [
      "hiking_area",
      "park",
      "point_of_interest",
      "establishment"
    ],
    userRatingCount: 4484,
    websiteURI: "http://www.hennopstrails.co.za/",
    editorialSummary: "Picturesque hiking, biking & offroad trails on farmland with picnic & BBQ areas & swimming pools.",
    isGoodForChildren: true
  },
  Lg: null,
  Rg: null,
  Sg: {
    compoundCode: "6X3Q+52 Pretoria, South Africa",
    globalCode: "5G696X3Q+52"
  },
  Kg: [
    "hiking_area",
    "park",
    "point_of_interest",
    "establishment"
  ],
  Gg: {},
  photos: [
    {
      name: "places/ChIJyR2OqEB-lR4RRfBDzOLMzZM/photos/AUc7tXWH9NsYZlkgq4oJGL__no741hrh_kO4Wl5csxckF0ijt8cKxb2gI1mw-rmQrhWoiXRkOUUBVWZ4r0gUGjVqdsmcepZgYj17_NM4qPbQi-9w_IfajwPyNLV9zChHqQcDpHebGgHcaNn2JkYw6mRluQeyHNdAW3UEOkzG",
      widthPx: 720,
      heightPx: 405,
      authorAttributions: [
        {
          displayName: "Hennops Hiking Trail & Mtb Trail",
          uri: "//maps.google.com/maps/contrib/110142452261076789094",
          photoUri: "//lh3.googleusercontent.com/a-/ALV-UjXTtre5LI9UhFrbVIzkcxu9-t3H_oTfwSnD7pFti_4ULlHCJbN7=s100-p-k-no-mo"
        }
      ]
    },
    // other photos...
  ],
  firstPhotoUrl: 'https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg',
  type: "attractions"
};

describe('SearchCard Component', () => {
  test('renders the title', () => {
    render(<FilterCard place={place} />);
    const titleElement = screen.getByText(/Hennops Hiking Trail & Mtb Trail/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the rating', () => {
    render(<FilterCard place={place} />);
    const ratingElement = screen.getByText(/4.6/i);
    expect(ratingElement).toBeInTheDocument();
  });

  test('renders the number of reviews', () => {
    render(<FilterCard place={place} />);
    const reviewsElement = screen.getByText(/4484 reviews/i);
    expect(reviewsElement).toBeInTheDocument();
  });

  test('renders the editorial summary', () => {
    render(<FilterCard place={place} />);
    const summaryElement = screen.getByText(/Picturesque hiking, biking & offroad trails/i);
    expect(summaryElement).toBeInTheDocument();
  });

  test('renders the location', () => {
    render(<FilterCard place={place} />);
    const locationElement = screen.getByText(/Pretoria South Africa/i);
    expect(locationElement).toBeInTheDocument();
  });

  test('renders the "Good for families with children" badge', () => {
    render(<FilterCard place={place} />);
    const badgeElement = screen.getByText(/Good for families with children/i);
    expect(badgeElement).toBeInTheDocument();
  });

  test('renders the price', () => {
    render(<FilterCard place={place} />);
    const priceElement = screen.getByText(/ZAR/i);
    expect(priceElement).toBeInTheDocument();
  });

  test('renders the first photo', () => {
    render(<FilterCard place={place} />);
    const photoElement = screen.getByAltText(/Hennops Hiking Trail & Mtb Trail/i);
    expect(photoElement).toBeInTheDocument();
    expect(photoElement).toHaveAttribute('src', place.firstPhotoUrl);
  });

  test('selects a date', () => {
    render(<FilterCard place={place} />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '2024-06-01' } });
    const selectedDateElement = screen.getByText(/Selected Date: 2024-06-01/i);
    expect(selectedDateElement).toBeInTheDocument();
  });
});

describe('getRatingColor', () => {
  it('returns bg-green-500 for rating 4 and above', () => {
    expect(getRatingColor(4)).toBe('bg-green-500');
    expect(getRatingColor(5)).toBe('bg-green-500');
  });

  it('returns bg-yellow-500 for rating between 3 and 3.99', () => {
    expect(getRatingColor(3)).toBe('bg-yellow-500');
    expect(getRatingColor(3.5)).toBe('bg-yellow-500');
  });

  it('returns bg-red-500 for rating below 3', () => {
    expect(getRatingColor(2.99)).toBe('bg-red-500');
    expect(getRatingColor(1)).toBe('bg-red-500');
  });
});

describe('getPricePlaceholder', () => {
  it('returns correct placeholder for stays', () => {
    expect(getPricePlaceholder('stays')).toBe('per night');
  });

  it('returns correct placeholder for attractions', () => {
    expect(getPricePlaceholder('attractions')).toBe('per ticket');
  });

  it('returns correct placeholder for carRental', () => {
    expect(getPricePlaceholder('carRental')).toBe('per day');
  });

  it('returns correct placeholder for airportTaxis', () => {
    expect(getPricePlaceholder('airportTaxis')).toBe('per ride');
  });

  it('returns default placeholder for unknown type', () => {
    expect(getPricePlaceholder('unknown')).toBe('Price not available');
  });
});

describe('generatePrice', () => {
  it('calculates price for stays in Africa', () => {
    const price = generatePrice('abc', 'stays', 'Africa');
    expect(price).toBeCloseTo(1971, -2);
  });

  it('calculates price for attractions in USA', () => {
    const price = generatePrice('def', 'attractions', 'USA');
    expect(price).toBeCloseTo(1083, -2);
  });

  it('calculates price for car rental in UK', () => {
    const price = generatePrice('ghi', 'carRental', 'UK');
    expect(price).toBeCloseTo(1658, -2);
  });

  it('calculates price for airport taxis in unknown country', () => {
    const price = generatePrice('jkl', 'airportTaxis', 'Unknown');
    expect(price).toBeCloseTo(809, -2);
  });

  it('calculates price for unknown type in unknown country', () => {
    const price = generatePrice('mno', 'unknown', 'Unknown');
    expect(price).toBeCloseTo(2039, -2);
  });
});
