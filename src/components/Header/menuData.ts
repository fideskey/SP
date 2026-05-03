import { Menu } from "@/types/Menu";

const menuData: Menu[] = [
  { id: 1, title: "Inicio",    path: "/",                   newTab: false },
  { id: 2, title: "Tienda",    path: "/shop-with-sidebar",  newTab: false },
  { id: 3, title: "Contacto",  path: "/contact",            newTab: false },
  {
    id: 4,
    title: "Páginas",
    newTab: false,
    submenu: [
      { id: 41, title: "Mi cuenta",        path: "/my-account",  newTab: false },
      { id: 42, title: "Carrito",          path: "/cart",        newTab: false },
      { id: 43, title: "Lista de deseos",  path: "/wishlist",    newTab: false },
      { id: 44, title: "Checkout",         path: "/checkout",    newTab: false },
    ],
  },
];

export default menuData;
