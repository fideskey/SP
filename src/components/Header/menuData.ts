// Definimos el tipo aquí mismo para evitar el error de importación
export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Tienda",
    path: "/shop",
    newTab: false,
  },
  {
    id: 3,
    title: "Contacto",
    path: "/contact",
    newTab: false,
  },
];

export default menuData;
