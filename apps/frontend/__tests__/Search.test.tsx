import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterCard from '../app/search/searchCard';
import { getRatingColor, getPricePlaceholder, generatePrice } from '../app/search/searchCard';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "@/libs/firebase/firebase";
import { initializeApp } from "firebase/app";
import getUser from "@/libs/actions/getUser";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import createSupabaseServerClient from "@/libs/supabase/server";
import axios from "axios";
import Cookies from "js-cookie";
import MockAdapter from 'axios-mock-adapter';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getItineraryImage } from '../app/itinerary';
import { createItinerary } from '../app/itinerary';
import { getItineraries } from '../app/itinerary';
import SearchCard from '../app/search/searchCard';

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn()
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock("@supabase/ssr", () => ({
  __esModule: true, 
  default: jest.fn(),
  createServerClient: jest.fn(),

}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(() => 'user_id'),
}));

// jest.mock("@/libs/supabase/server", () => ({
//   __esModule: true,
//   default: jest.fn(),
//   createSupabaseServerClient: jest.fn(),
// }));

// jest.mock("'../app/itinerary", () => ({
//   getItineraryImage: jest.fn(),
//   createItinerary: jest.fn(),
//   getItineraries: jest.fn(), // Mock the function
// }));

const mockAxios = new MockAdapter(axios);
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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



describe("getItineraryImage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the URL of the location image if it exists", async () => {
    const location = "test-location";
    const imageUrl = "https://example.com/test-location.jpg";
    getStorage.mockReturnValue({});
    ref.mockReturnValue({});
    getDownloadURL.mockResolvedValueOnce(imageUrl);

    const result = await getItineraryImage(location);

    expect(getStorage).toHaveBeenCalledWith(app);
    expect(ref).toHaveBeenCalledWith(expect.anything(), `locations/${location.toLowerCase()}.jpg`);
    expect(getDownloadURL).toHaveBeenCalledWith(expect.anything());
    expect(result).toBe(imageUrl);
  });

  it("should return the URL of the default image if the location image does not exist", async () => {
    const location = "non-existent-location";
    const defaultImageUrl = "https://example.com/Default1.jpg";
    getStorage.mockReturnValue({});
    ref.mockReturnValue({});
    getDownloadURL.mockRejectedValueOnce(new Error("Image not found"));
    getDownloadURL.mockResolvedValueOnce(defaultImageUrl);

    const result = await getItineraryImage(location);

    expect(getStorage).toHaveBeenCalledWith(app);
    expect(ref).toHaveBeenCalledWith(expect.anything(), `locations/${location.toLowerCase()}.jpg`);
    expect(getDownloadURL).toHaveBeenCalledTimes(2); // Ensure getDownloadURL is called twice
    expect(getDownloadURL).toHaveBeenCalledWith(expect.anything()); // First call
    expect(getDownloadURL).toHaveBeenCalledWith(expect.anything()); // Second call for the default image
    expect(result).toBe(defaultImageUrl);
  });
});

describe('createSupabaseServerClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a Supabase server client with the correct configuration', async () => {
    const mockCookieStore = {
      get: jest.fn((name) => ({ name, value: "mockValue" })),
      set: jest.fn(),
    };

    const mockClient = { /* mock client object */ };

    cookies.mockReturnValue(mockCookieStore);
    createServerClient.mockReturnValue(mockClient);

    const result = await createSupabaseServerClient();

    expect(cookies).toHaveBeenCalled();
    expect(createServerClient).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: expect.any(Function),
          set: expect.any(Function),
          remove: expect.any(Function),
        },
      }
    );

    // Check if the cookie functions are called correctly
    const cookieFunctions = createServerClient.mock.calls[0][2].cookies;

    expect(cookieFunctions.get('test')).toEqual('mockValue');
    cookieFunctions.set('test', 'value', { path: '/' });
    expect(mockCookieStore.set).toHaveBeenCalledWith({ name: 'test', value: 'value', path: '/' });

    cookieFunctions.remove('test', { path: '/' });
    expect(mockCookieStore.set).toHaveBeenCalledWith({ name: 'test', value: '', path: '/' });

    expect(result).toBe(mockClient);
  });
});

describe('getUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user data if the document exists', async () => {
    const mockFirebaseConfig = {
      apiKey: "mock-api-key",
      authDomain: "mock-auth-domain",
      projectId: "mock-project-id",
      storageBucket: "mock-storage-bucket",
      messagingSenderId: "mock-messaging-sender-id",
      appId: "mock-app-id",
    };
    initializeApp.mockResolvedValue({
      name: "[DEFAULT]",
      options: mockFirebaseConfig,
      automaticDataCollectionEnabled: false,
      _container: { /* internal container details */ },
      _isDeleted: false,
      _automaticDataCollectionEnabled: false,
      _deleted: false,
    });

    const mockUserData = { name: "John Doe", age: 30 };
    const mockDocSnap = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue(mockUserData),
    };

    getFirestore.mockReturnValue({});
    doc.mockReturnValue({});
    getDoc.mockResolvedValue(mockDocSnap);

    const user_id = "12345";
    const result = await getUser(user_id);

    expect(getFirestore).toHaveBeenCalledWith(app);
    expect(doc).toHaveBeenCalledWith({}, "Users", user_id);
    expect(getDoc).toHaveBeenCalledWith({});
    expect(result).toEqual(JSON.stringify(mockUserData));
  });

  it('should return null if the document does not exist', async () => {
    const mockFirebaseConfig = {
      apiKey: "mock-api-key",
      authDomain: "mock-auth-domain",
      projectId: "mock-project-id",
      storageBucket: "mock-storage-bucket",
      messagingSenderId: "mock-messaging-sender-id",
      appId: "mock-app-id",
    };
    initializeApp.mockResolvedValue({
      name: "[DEFAULT]",
      options: mockFirebaseConfig,
      automaticDataCollectionEnabled: false,
      _container: { /* internal container details */ },
      _isDeleted: false,
      _automaticDataCollectionEnabled: false,
      _deleted: false,
    });

    const mockDocSnap = {
      exists: jest.fn().mockReturnValue(false),
      data: jest.fn(),
    };

    getFirestore.mockReturnValue({});
    doc.mockReturnValue({});
    getDoc.mockResolvedValue(mockDocSnap);

    const user_id = "12345";
    const result = await getUser(user_id);

    expect(getFirestore).toHaveBeenCalledWith(app);
    expect(doc).toHaveBeenCalledWith({}, "Users", user_id);
    expect(getDoc).toHaveBeenCalledWith({});
    expect(result).toBeNull();
  });
});

describe('dataTests', () => {
  it('calculates price for stays in Africa', () => {
    const mockFirebaseConfig = {
      apiKey: "mock-api-key",
      authDomain: "mock-auth-domain",
      projectId: "mock-project-id",
      storageBucket: "mock-storage-bucket",
      messagingSenderId: "mock-messaging-sender-id",
      appId: "mock-app-id",
    };
    initializeApp.mockResolvedValue({
      name: "[DEFAULT]",
      options: mockFirebaseConfig,
      automaticDataCollectionEnabled: false,
      _container: { /* internal container details */ },
      _isDeleted: false,
      _automaticDataCollectionEnabled: false,
      _deleted: false,
    });
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

describe('SearchCard', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('renders the SearchCard component and handles modals', async () => {
    render(<SearchCard place={place} />);
    Cookies.get.mockReturnValue('mocked_user_id');

    const location = "test-location";
    const imageUrl = "https://example.com/test-location.jpg";
    getStorage.mockReturnValue({});
    ref.mockReturnValue({});
    getDownloadURL.mockResolvedValueOnce(imageUrl);

    mockAxios.onPost(`${backendUrl}/itinerary/getItineraries`).reply(200, [
      { id: '1', name: 'Itinerary 1', location: 'Location 1', "user_id":"R0mm5MMoNLR0MpBnz1i5IQLgIx42","imageUrl":"https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg" },
      { id: '2', name: 'Itinerary 2', location: 'Location 2', "user_id":"R0mm5MMoNLR0MpBnz1i5IQLgIx42","imageUrl":"https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg" },
    ]);
    // Simulate clicking "Add to Itinerary"
    fireEvent.click(screen.getByText('Add to Itinerary'));

    // Wait for the modal to open and the itineraries to be fetched
    await waitFor(() => expect(screen.getByText('Select or Create an Itinerary')).toBeInTheDocument());

    // Select an itinerary from the dropdown
    fireEvent.click(screen.getByText('Select an itinerary'));
    //fireEvent.change(screen.getByText('Select an itinerary'), { target: { value: JSON.stringify({ id: '1', name: 'Itinerary 1', location: 'Location 1', "user_id":"R0mm5MMoNLR0MpBnz1i5IQLgIx42","imageUrl":"https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-1500x1000.jpg" }) } });

    const dropdown = screen.getByText('Select an itinerary');
    fireEvent.click(screen.getByText('Itinerary 1'));
    // Mock the axios response for saving the itinerary item
    mockAxios.onPost(`${backendUrl}/itinerary-items/add`).reply(200);

    // Simulate clicking "Save to Selected"
    fireEvent.click(screen.getByText('Save to Selected'));

    // Wait for the modal to close
    await waitFor(() => expect(screen.queryByText('Select or Create an Itinerary')).not.toBeInTheDocument());

    // Simulate clicking "Create New Itinerary"
    fireEvent.click(screen.getByText('Add to Itinerary'));
    await waitFor(() => expect(screen.getByText('Select or Create an Itinerary')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Create New Itinerary'));

    // Wait for the new itinerary modal to open
    await waitFor(() => expect(screen.getByText('Create New Itinerary')).toBeInTheDocument());

    // Fill out the new itinerary form
    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'New Location' } });
    fireEvent.change(screen.getByPlaceholderText('Trip Name'), { target: { value: 'New Trip' } });

    // Mock the axios response for creating the new itinerary
    mockAxios.onPost(`${backendUrl}/itinerary/create`).reply(200, { config: { data: JSON.stringify({ location: 'New Location', tripName: 'New Trip' }) }, data: '3' });
    mockAxios.onPost(`${backendUrl}/itinerary-items/add`).reply(200);
    // Simulate clicking "Save New Itinerary"
    fireEvent.click(screen.getByText('Save New Itinerary'));

    

    // Wait for the modal to close
    await waitFor(() => expect(screen.queryByText('Create New Itinerary')).not.toBeInTheDocument());
  });
});

describe("getItineraries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data if the query is successful", async () => {
    const mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({
        data: [{ id: 1, name: 'Test Itinerary' }],
        error: null,
      }),
    };

    const createSupabaseServerClientSpy = jest
      .spyOn(require('@/libs/supabase/server'), 'default')
      .mockResolvedValue(mockSupabaseClient);

    const result = await getItineraries();

    expect(createSupabaseServerClientSpy).toHaveBeenCalled();
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("Itinerary");
    expect(mockSupabaseClient.select).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1, name: 'Test Itinerary' }]);

    createSupabaseServerClientSpy.mockRestore();
  });

  it("should log error and return undefined if the query fails", async () => {
    const mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({
        data: null,
        error: new Error("Query failed"),
      }),
    };

    const createSupabaseServerClientSpy = jest
      .spyOn(require('@/libs/supabase/server'), 'default')
      .mockResolvedValue(mockSupabaseClient);

    // Use spyOn to mock console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getItineraries();

    expect(createSupabaseServerClientSpy).toHaveBeenCalled();
    expect(mockSupabaseClient.from).toHaveBeenCalledWith("Itinerary");
    expect(mockSupabaseClient.select).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith("error", new Error("Query failed"));
    expect(result).toBeNull();

    createSupabaseServerClientSpy.mockRestore(); // Restore the original function after the test
    consoleErrorSpy.mockRestore(); 
  });
});