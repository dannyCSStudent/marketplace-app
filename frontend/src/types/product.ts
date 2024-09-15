export interface Product {
    _id: string;
    sellerId: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    categories: string[];
    condition: string;
    images: string[];
    videoUrl?: string;
    isLocalPickup: boolean;
    isShippable: boolean;
    createdAt: Date;
    updatedAt: Date;
    status: string;
  }