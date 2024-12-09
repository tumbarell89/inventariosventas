import type { APIRoute } from 'astro';
import { getUserBusinessName, getAllUserTypes } from '../../../controllers/userController';
import { verifyJWT } from '../../../middlewares/authMiddleware';

export const GET: APIRoute = async (context) => {
  try {
    const authenticatedRequest = await verifyJWT(context);
    const userId = authenticatedRequest.user?.userId;

    if (!userId) {
      throw new Error('User ID not found in token');
    }

    const businessName = await getUserBusinessName(userId);
    const userTypes = await getAllUserTypes();

    return new Response(JSON.stringify({ businessName, userTypes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching business info:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch business info' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

