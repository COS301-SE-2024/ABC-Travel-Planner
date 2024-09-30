import React from 'react';
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterCard from '../app/filter/filterCard';
import { getRatingColor, getPricePlaceholder, generatePrice } from '../app/filter/filterCard'
import * as navigation from 'next/navigation'
import { useRouter } from 'next/navigation';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { insertRecord } from '@/app/utils/functions/insertRecord';
import Cookie from 'js-cookie';
import nock from 'nock';
// import getDate from '../app/utils/functions/getDate'
import { useTheme } from '../app/context/ThemeContext';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('2024-10-01T00:00:00Z'));
});

afterAll(() => {
  jest.useRealTimers();
});

jest.mock('../app/context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('@/app/utils/functions/insertRecord');

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
  type: "Attractions"
};

describe('FilterCard Component', () => {
  const routerPushMock = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }));

    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });

    (useTheme as jest.Mock).mockReturnValue({
      selectedTheme: 'beach',
      themeStyles: {
        background: '#ffffff',
        textColor: '#000000',
      },
      setTheme: jest.fn(),
    });

    global.localStorage.setItem('id', JSON.stringify({ id: 'mockId' }));
    global.localStorage.setItem('location', JSON.stringify({ location: 'mockLocation' }));

    (Cookie.get as jest.Mock).mockReturnValue('mockUserId');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

    // Open the DatePicker
    const selectButton = screen.getByText(/Select Dates/i);
    fireEvent.click(selectButton);

    // Wait for the DatePicker to appear
    const datePicker = screen.getByRole('dialog'); // Ensure this role is correct
    expect(datePicker).toBeInTheDocument();

    // Select the date by aria-label
    const dateToSelect = screen.getByLabelText(/Choose Tuesday, October 1st, 2024/i);
    expect(dateToSelect).toBeInTheDocument();
    fireEvent.click(dateToSelect);

    const secondDate = screen.getByLabelText(/Choose Wednesday, October 2nd, 2024/i);
    expect(secondDate).toBeInTheDocument();
    fireEvent.click(secondDate);

    // Close the DatePicker
    const doneButton = screen.getByText(/Done/i);
    fireEvent.click(doneButton);

    // Verify the selected date
    const selectedDateElement = screen.getByText(/Selected Date: 10\/1\/2024/i); // Adjust based on the actual date format
    expect(selectedDateElement).toBeInTheDocument();

    const selectedDateElement2 = screen.getByText(/Selected Date: 10\/2\/2024/i);
    expect(selectedDateElement2).toBeInTheDocument();
  });

  it('should upload item and navigate on successful upload', async () => {
    (insertRecord as jest.Mock).mockResolvedValue(200);

    render(<FilterCard place={place} />);

    const uploadButton = screen.getByText(place.displayName); // Adjust the button selector as per your component

    const selectButton = screen.getByText(/Select Dates/i);
    fireEvent.click(selectButton);

    // Wait for the DatePicker to appear
    const datePicker = screen.getByRole('dialog'); // Ensure this role is correct
    expect(datePicker).toBeInTheDocument();

    const currentMonth = screen.getByText(/October 2024/i);
    expect(currentMonth).toBeInTheDocument();

    // Select the date by aria-label
    const dateToSelect = screen.getByLabelText(/Choose Wednesday, October 30th, 2024/i);
    expect(dateToSelect).toBeInTheDocument();
    fireEvent.click(dateToSelect);

    // Close the DatePicker
    const doneButton = screen.getByText(/Done/i);
    fireEvent.click(doneButton);

    // Verify the selected date
    const selectedDateElement = screen.getByText(/Selected Date: 10\/30\/2024/i); // Adjust based on the actual date format
    expect(selectedDateElement).toBeInTheDocument();

    fireEvent.click(uploadButton);

    await waitFor(() => {
      const triggerState = screen.getByTestId('trigger-state');
      expect(triggerState.textContent).toBe('false');
    }, { timeout: 100 })

    await waitFor(() => {
      const triggerState = screen.getByTestId('trigger-state');
      expect(triggerState.textContent).toBe('false')
    }, { timeout: 2500 })

    await waitFor(() => expect(insertRecord).toHaveBeenCalledWith({
      user_id: 'mockUserId',
      item_name: place.displayName,
      item_type: place.type,
      price: undefined, // Add the correct price if it's available in the place object
      date: [new Date("2024-10-30T00:00:00.000Z")], // Adjust this to match the selected dates state
      location: 'mockLocation',
      itinerary_id: 'mockId',
      destination: place.formattedAddress,
      image_url: place.firstPhotoUrl,
    }));

    const result = await insertRecord({
      user_id: 'mockUserId',
      item_name: place.displayName,
      item_type: place.type,
      price: undefined,
      date: [new Date("2024-10-30T00:00:00.000Z")],
      location: 'mockLocation',
      itinerary_id: 'mockId',
      destination: place.formattedAddress,
      image_url: place.firstPhotoUrl,
    });
    expect(result).toBe(200);

    //Date changed to work on Github actions
    expect(routerPushMock).toHaveBeenCalledWith(
      `/itinerary-items?id=mockId&location=mockLocation&destination=${place}&dates=Wed Oct 30 2024 00:00:00 GMT+0000 (Coordinated Universal Time)`
    );
  });

  it('should check trigger value for dates', async () => {
    (insertRecord as jest.Mock).mockResolvedValue(200);

    render(<FilterCard place={place} />);

    const uploadButton = screen.getByText(place.displayName);

    fireEvent.click(uploadButton);

    await waitFor(() => {
      const triggerState = screen.getByTestId('trigger-state');
      expect(triggerState.textContent).toBe('true');
    }, { timeout: 100 })

    await waitFor(() => {
      const triggerState = screen.getByTestId('trigger-state');
      expect(triggerState.textContent).toBe('false')
    }, { timeout: 2500 })
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
    expect(getPricePlaceholder('Hotels')).toBe('per night');
  });

  it('returns correct placeholder for attractions', () => {
    expect(getPricePlaceholder('Attractions')).toBe('per ticket');
  });

  it('returns correct placeholder for carRental', () => {
    expect(getPricePlaceholder('Car Rentals')).toBe('per day');
  });

  it('returns correct placeholder for airportTaxis', () => {
    expect(getPricePlaceholder('Airport Taxis')).toBe('per ride');
  });

  it('returns default placeholder for unknown type', () => {
    expect(getPricePlaceholder('unknown')).toBe('Price not available');
  });
});

describe('generatePrice', () => {
  it('calculates price for stays in Africa', () => {
    const price = generatePrice('abc', 'Hotels', 'Africa');
    expect(price).toBeCloseTo(1971, -2);
  });

  it('calculates price for attractions in USA', () => {
    const price = generatePrice('def', 'Attractions', 'USA');
    expect(price).toBeCloseTo(1083, -2);
  });

  it('calculates price for car rental in UK', () => {
    const price = generatePrice('ghi', 'Car Rentals', 'UK');
    expect(price).toBeCloseTo(1658, -2);
  });

  it('calculates price for airport taxis in unknown country', () => {
    const price = generatePrice('jkl', 'Airport Taxis', 'Unknown');
    expect(price).toBeCloseTo(809, -2);
  });

  it('calculates price for unknown type in unknown country', () => {
    const price = generatePrice('mno', 'unknown', 'Unknown');
    expect(price).toBeCloseTo(2039, -2);
  });
});

describe('insertRecord', () => {
  beforeEach(() => {
    nock.cleanAll();
    process.env.NEXT_PUBLIC_BACKEND_URL = 'https://example.com';
  });

  it('should make a POST request and return the response status', async () => {
    nock('https://example.com')
      .post('/itinerary-items/add', {
        user_id: 'mockUserId',
        item_name: 'Mock Item',
        item_type: 'attraction',
        date: [],
        location: 'mockLocation',
        itinerary_id: 'mockId',
        destination: 'mockDestination',
        image_url: 'mockImageUrl',
      })
      .reply(200);

    const result = await insertRecord({
      user_id: 'mockUserId',
      item_name: 'Mock Item',
      item_type: 'attraction',
      date: [],
      location: 'mockLocation',
      itinerary_id: 'mockId',
      destination: 'mockDestination',
      image_url: 'mockImageUrl',
    });

    expect(result).toBe(200);
  });

});
