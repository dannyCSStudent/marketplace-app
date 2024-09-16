import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(500),
  languages: Joi.array().items(Joi.string()),
});

export const productSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(1000),
  price: Joi.number().required().min(0),
  currency: Joi.string().required().length(3), // e.g., 'USD', 'EUR'
  categories: Joi.array().items(Joi.string()).min(1),
  condition: Joi.string().valid('new', 'like new', 'good', 'fair', 'poor').required(),
  images: Joi.array().items(Joi.string().uri()),
  is_local_pickup: Joi.boolean(),
  is_shippable: Joi.boolean(),
});

export const searchSchema = Joi.object({
  query: Joi.string(),
  category: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0).greater(Joi.ref('minPrice')),
});