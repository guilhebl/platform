export interface Product {
  id: string;
  upc: string;
  name: string;
  sourceName: string;
  sourceItemDetailViewUrl: string;
  imageUrl: string;
  sourceImageUrl: string;
  category: string;
  price: number;
  rating: number;
  numReviews: number;
}

export function generateMockProduct(): Product {
  return {
    id: '55760264',
    upc: '065857174434',
    name:
      'Better Homes and Gardens Leighton Twin-Over-Full Bunk Bed, Multiple Colors',
    sourceName: 'walmart.com',
    sourceItemDetailViewUrl: 'http://c.affil.walmart.com/t/api02?l=12345678',
    imageUrl: 'http://localhost:5555/assets/images/image-placeholder.png',
    sourceImageUrl: 'http://localhost:5555/assets/images/best-buy-logo.png',
    category: 'laptops',
    price: 445.55,
    rating: 3.55,
    numReviews: 100,
  };
}
