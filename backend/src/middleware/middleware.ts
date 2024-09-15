import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} request to ${req.url}`);
    
    next(); // Continue to the next middleware or route handler
};
