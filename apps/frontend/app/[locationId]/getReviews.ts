// getReviews.ts

"use server";

export interface Review {
    id: number;
    user: string;
    comment: string;
    rating: number;
    title: string;
  }

// Mock data
const mockReviews = [
    { id: 1, user: 'Alice', comment: 'Great place!', rating: 5, title: 'Amazing Experience' },
    { id: 2, user: 'Bob', comment: 'Not bad', rating: 3, title: 'Decent Visit' },
    { id: 3, user: 'Charlie', comment: 'Could be better', rating: 2, title: 'Average' },
];

const getReviews = async (location_id: string) => {
    if (!location_id) {
        console.error('Location ID is undefined');
        return [];
    }
    console.log(`(${typeof location_id}) Received id: ${location_id}`);

    // Simulate database call
    return mockReviews;
};

export default getReviews;
