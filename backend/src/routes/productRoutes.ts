import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateUser, createProduct);
router.get('/', authenticateUser, getProducts);
router.get('/:id', authenticateUser, getProductById);
router.put('/:id', authenticateUser, updateProduct);
router.delete('/:id', authenticateUser, deleteProduct);

export default router;