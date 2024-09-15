import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { NotFoundError, BadRequestError } from '../utils/CustomError';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = new Product({
      ...req.body,
      seller_id: req.auth.userId,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    next(new BadRequestError('Error creating product'));
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, seller_id: req.auth.userId },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      throw new NotFoundError('Product not found or you do not have permission to update');
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
      seller_id: req.auth.userId,
    });
    if (!deletedProduct) {
      throw new NotFoundError('Product not found or you do not have permission to delete');
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};