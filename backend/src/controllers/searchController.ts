import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { BadRequestError } from '../utils/CustomError';

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, category, minPrice, maxPrice } = req.query;
    
    let searchCriteria: any = {};
    
    if (query) {
      searchCriteria.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category) {
      searchCriteria.categories = category;
    }
    
    if (minPrice || maxPrice) {
      searchCriteria.price = {};
      if (minPrice) searchCriteria.price.$gte = Number(minPrice);
      if (maxPrice) searchCriteria.price.$lte = Number(maxPrice);
    }
    
    const products = await Product.find(searchCriteria);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(new BadRequestError('Error searching products'));
  }
};