import jwt from 'jsonwebtoken';
import type { APIContext } from 'astro';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    // Add any other properties you want to include in the user object
  };
}

export function verifyJWT(context: APIContext): Promise<AuthenticatedRequest> {
  return new Promise((resolve, reject) => {
    const authHeader = context.request.headers.get('Authorization');
    if (!authHeader) {
      reject(new Error('No token provided'));
      return;
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        reject(new Error('Failed to authenticate token'));
        return;
      }

      // Add the user information to the request object
      const authenticatedRequest = context.request as AuthenticatedRequest;
      authenticatedRequest.user = {
        userId: decoded.userId,
        // Add any other properties you want to include
      };

      resolve(authenticatedRequest);
    });
  });
}

