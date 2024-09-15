'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../../types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold mt-2">{product.price} {product.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}