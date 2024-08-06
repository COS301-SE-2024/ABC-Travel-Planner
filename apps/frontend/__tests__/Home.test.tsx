// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Home from '../app/home/page';
// import 
// import axios from 'axios';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('Home Component', () => {
//   beforeEach(() => {
//     mockedAxios.get.mockClear();
//   });

//   test('renders top destinations', async () => {
//     const mockPosts = [
//       { id: '1', user_id: '1', post_title: 'Test Post', post_description: 'Test Description', post_likes: 5, timestamp: Date.now() },
//     ];

//     const mockDestinations = {
//       results: [
//         { name: 'France', photos: [{ photo_reference: 'test-photo-ref' }], formatted_address: 'Paris', place_id: '1', types: ['country'] },
//       ],
//     };

//     mockedAxios.get.mockImplementation((url) => {
//       switch (url) {
//         case 'http://localhost:4000/posts':
//           return Promise.resolve({ data: mockPosts });
//         case 'http://localhost:4000/google-maps/popular-destinations':
//           return Promise.resolve({ data: mockDestinations });
//         default:
//           return Promise.reject(new Error('not found'));
//       }
//     });

//     render(<Home />);
//     await waitFor(() => expect(screen.getByText('Top Destinations for Your Next Holiday')).toBeInTheDocument());
//   });

//   test('renders posts', async () => {
//     const mockPosts = [
//       { id: '1', user_id: '1', post_title: 'Test Post', post_description: 'Test Description', post_likes: 5, timestamp: Date.now() },
//     ];

//     const mockDestinations = {
//       results: [
//         { name: 'France', photos: [{ photo_reference: 'test-photo-ref' }], formatted_address: 'Paris', place_id: '1', types: ['country'] },
//       ],
//     };

//     mockedAxios.get.mockImplementation((url) => {
//       switch (url) {
//         case 'http://localhost:4000/posts':
//           return Promise.resolve({ data: mockPosts });
//         case 'http://localhost:4000/google-maps/popular-destinations':
//           return Promise.resolve({ data: mockDestinations });
//         default:
//           return Promise.reject(new Error('not found'));
//       }
//     });

//     render(<Home />);
//   });
// });