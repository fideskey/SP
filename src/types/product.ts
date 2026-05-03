export type Product = {
  id: number;
  idFideskey: string;
  title: string;
  price: number;
  discountedPrice: number;
  reviews: number;
  categoria?: string;
  subcategoria?: string;
  descripcion?: string;
  dimensiones?: string;
  colores?: string[];
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
