export type Product = {
  // Campos básicos
  id: number;
  idFideskey: string;        // FK-DEC-00001
  title: string;
  price: number;
  discountedPrice: number;
  reviews: number;

  // Categorización
  categoria?: string;        // Decoración
  subcategoria?: string;     // Infantil

  // Descripción y detalles
  descripcion?: string;
  dimensiones?: string;
  colores?: string[];        // ["rojo", "azul", "verde"]

  // Imágenes
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
