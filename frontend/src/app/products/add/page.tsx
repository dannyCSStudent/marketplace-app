'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        price: parseFloat(price),
        currency,
        sellerId: 'placeholder-id', // Replace with actual user ID when authentication is implemented
      }),
    });

    if (response.ok) {
      router.push('/products');
    } else {
      console.error('Failed to add product');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block mb-2">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="currency" className="block mb-2">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}