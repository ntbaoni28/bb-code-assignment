export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category?: string;
  [key: string]: any;
};
