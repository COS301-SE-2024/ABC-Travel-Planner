// pages/api/reviews.ts

import { NextApiRequest, NextApiResponse } from 'next';
import  getReviews, {Review}   from './getReviews';

/*const addReview = async (reviewData: Review): Promise<Review[]> => {
  // Fetch existing reviews
  const existingReviews = await getReviews();

  // Generate a new unique ID for the review
  const newReviewId = existingReviews.length > 0 ? Math.max(...existingReviews.map(review => review.id)) + 1 : 1;

  // Add the new review with the generated ID
  const newReview = { id: newReviewId, ...reviewData };
  existingReviews.push(newReview);

  // For simplicity, you might want to persist the new data here in your actual application

  return ;
};*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user, title, comment, rating } = req.body;

      // Validate review data
      if (!user || !title || !comment || !rating) {
        return res.status(400).json({ message: 'Please provide all necessary review data.' });
      }

      // Add the new review
     // const newReviews = await addReview({ user, title, comment, rating });

      // Respond with the updated reviews
      //res.status(200).json(newReviews);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ message: 'An error occurred while adding the review.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
