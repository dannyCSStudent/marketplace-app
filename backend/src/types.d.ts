import { Clerk } from '@clerk/clerk-sdk-node';
import { User } from './models/User'; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
        getToken: () => Promise<string | null>;
      } & Record<string, unknown>;
      clerk: Clerk;
      user?: User; // Add this line
    }
  }
}

export {};