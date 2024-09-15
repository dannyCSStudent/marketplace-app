import { Clerk } from '@clerk/clerk-sdk-node';

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
        getToken: () => Promise<string | null>;
      } & Record<string, unknown>;
      clerk: Clerk;
    }
  }
}

export {};