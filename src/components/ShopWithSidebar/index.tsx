"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import shopData from "../Shop/shopData";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";

const PRODUCTOS_POR_PAGINA = 20;

// Categorías de FidesKey
const CATEGORIAS = [
  "Todas",
  "Globos",
  "Decoración",
  "Fiestas Temáticas",
  "Recuerdos",
  "Carnaval y Disfraces",
  "Cotillón",
  "Vajilla Descartable",
  "Velas",
  "Navidad",
  "Fechas Especiales",
  "Cintas y Lazos",
  "Papelería",
];

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const options = [
    { label: "Más recientes", value: "0" },
    { label: "Más vendidos", value: "1" },
    { label: "Precio menor a mayor", value: "2" },
  ];

  useEffect(() => {
    const handleStickyMenu = () => setStickyMenu(window.scrollY >= 80);
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as Element).closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }
    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productSidebar]);

  // Filtrar productos
  const productosFiltrados = shopData.filter((p) => {
    const matchCategoria =
      categoriaSeleccionada === "Todas" ||
      (p as any).categoria === categoriaSeleccionada;
    const matchBusqueda =
      busqueda === "" ||
      p.title.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
  const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const productosPagina = productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

  // Al cambiar filtro volver a página 1
  const cambiarCategoria = (cat: string) => {
    setCategoriaSeleccionada(cat);
    setPaginaActual(1);
  };

  // Generar páginas visibles
  const getPaginas = () => {
    const paginas = [];
    const delta = 2;
    for (let i = Math.max(1, paginaActual - delta); i <= Math.min(totalPaginas, paginaActual + delta); i++) {
      paginas.push(i);
    }
    return paginas;
  };

  return (
    <>
      <Breadcrumb title={"Todos los Productos"} pages={["productos"]} />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">

            {/* ── SIDEBAR ── */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? "translate-x-0 bg-white p-5 h-screen overflow-y-auto"
                  : "-translate-x-full"
              }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="toggle sidebar"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-1 ${
                  stickyMenu ? "lg:top-20 top-35" : "lg:top-24 top-37"
                }`}
              >
                <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0068 3.44714C10.3121 3.72703 10.3328 4.20146 10.0529 4.5068L5.70494 9.25H20C20.4142 9.25 20.75 9.58579 20.75 10C20.75 10.4142 20.4142 10.75 20 10.75H4.00002C3.70259 10.75 3.43327 10.5742 3.3135 10.302C3.19374 10.0298 3.24617 9.71246 3.44715 9.49321L8.94715 3.49321C9.22704 3.18787 9.70147 3.16724 10.0068 3.44714Z" fill=""/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.6865 13.698C20.5668 13.4258 20.2974 13.25 20 13.25L4.00001 13.25C3.5858 13.25 3.25001 13.5858 3.25001 14C3.25001 14.4142 3.5858 14.75 4.00001 14.75L18.2951 14.75L13.9472 19.4932C13.6673 19.7985 13.6879 20.273 13.9932 20.5529C14.2986 20.8328 14.773 20.8121 15.0529 20.5068L20.5529 14.5068C20.7539 14.2876 20.8063 13.9703 20.6865 13.698Z" fill=""/>
                </svg>
              </button>

              <div className="flex flex-col gap-6">

                {/* Búsqueda */}
                <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                  <p className="font-medium text-dark mb-3">Buscar</p>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
                    className="w-full border border-gray-3 rounded-md px-3 py-2 text-sm outline-none focus:border-blue"
                  />
                </div>

                {/* Categorías */}
                <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                  <p className="font-medium text-dark mb-3">Categorías</p>
                  <ul className="flex flex-col gap-2">
                    {CATEGORIAS.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => cambiarCategoria(cat)}
                          className={`text-sm w-full text-left py-1 px-2 rounded transition-colors ${
                            categoriaSeleccionada === cat
                              ? "bg-blue text-white"
                              : "text-dark-4 hover:text-blue"
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
            {/* ── SIDEBAR END ── */}

            {/* ── CONTENIDO ── */}
            <div className="xl:max-w-[870px] w-full">

              {/* Barra superior */}
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />
                    <p className="text-sm text-dark-4">
                      Mostrando{" "}
                      <span className="text-dark font-medium">
                        {inicio + 1}–{Math.min(inicio + PRODUCTOS_POR_PAGINA, productosFiltrados.length)}
                      </span>{" "}
                      de{" "}
                      <span className="text-dark font-medium">{productosFiltrados.length}</span>{" "}
                      productos
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Grid */}
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="vista grilla"
                      className={`${productStyle === "grid" ? "bg-blue border-blue text-white" : "text-dark bg-gray-1 border-gray-3"} flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.836 1.3125C4.16215 1.31248 3.60022 1.31246 3.15414 1.37244C2.6833 1.43574 2.2582 1.57499 1.91659 1.91659C1.57499 2.2582 1.43574 2.6833 1.37244 3.15414C1.31246 3.60022 1.31248 4.16213 1.3125 4.83598V4.914C1.31248 5.58785 1.31246 6.14978 1.37244 6.59586C1.43574 7.06671 1.57499 7.49181 1.91659 7.83341C2.2582 8.17501 2.6833 8.31427 3.15414 8.37757C3.60022 8.43754 4.16213 8.43752 4.83598 8.4375H4.914C5.58785 8.43752 6.14978 8.43754 6.59586 8.37757C7.06671 8.31427 7.49181 8.17501 7.83341 7.83341C8.17501 7.49181 8.31427 7.06671 8.37757 6.59586C8.43754 6.14978 8.43752 5.58787 8.4375 4.91402V4.83601C8.43752 4.16216 8.43754 3.60022 8.37757 3.15414C8.31427 2.6833 8.17501 2.2582 7.83341 1.91659C7.49181 1.57499 7.06671 1.43574 6.59586 1.37244C6.14978 1.31246 5.58787 1.31248 4.91402 1.3125H4.836ZM2.71209 2.71209C2.80983 2.61435 2.95795 2.53394 3.30405 2.4874C3.66632 2.4387 4.15199 2.4375 4.875 2.4375C5.59801 2.4375 6.08368 2.4387 6.44596 2.4874C6.79205 2.53394 6.94018 2.61435 7.03791 2.71209C7.13565 2.80983 7.21607 2.95795 7.2626 3.30405C7.31131 3.66632 7.3125 4.15199 7.3125 4.875C7.3125 5.59801 7.31131 6.08368 7.2626 6.44596C7.21607 6.79205 7.13565 6.94018 7.03791 7.03791C6.94018 7.13565 6.79205 7.21607 6.44596 7.2626C6.08368 7.31131 5.59801 7.3125 4.875 7.3125C4.15199 7.3125 3.66632 7.31131 3.30405 7.2626C2.95795 7.21607 2.80983 7.13565 2.71209 7.03791C2.61435 6.94018 2.53394 6.79205 2.4874 6.44596C2.4387 6.08368 2.4375 5.59801 2.4375 4.875C2.4375 4.15199 2.4387 3.66632 2.4874 3.30405C2.53394 2.95795 2.61435 2.80983 2.71209 2.71209Z" fill=""/>
                      </svg>
                    </button>

                    {/* List */}
                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="vista lista"
                      className={`${productStyle === "list" ? "bg-blue border-blue text-white" : "text-dark bg-gray-1 border-gray-3"} flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.4234 0.899903C3.74955 0.899882 3.18763 0.899864 2.74155 0.959838C2.2707 1.02314 1.8456 1.16239 1.504 1.504C1.16239 1.8456 1.02314 2.2707 0.959838 2.74155C0.899864 3.18763 0.899882 3.74953 0.899903 4.42338V4.5014C0.899882 5.17525 0.899864 5.73718 0.959838 6.18326C1.02314 6.65411 1.16239 7.07921 1.504 7.42081C1.8456 7.76241 2.2707 7.90167 2.74155 7.96497C3.18763 8.02495 3.74953 8.02493 4.42339 8.02491H4.5014C5.17525 8.02493 14.7372 8.02495 15.1833 7.96497C15.6541 7.90167 16.0792 7.76241 16.4208 7.42081C16.7624 7.07921 16.9017 6.65411 16.965 6.18326C17.0249 5.73718 17.0249 5.17527 17.0249 4.50142V4.42341C17.0249 3.74956 17.0249 3.18763 16.965 2.74155C16.9017 2.2707 16.7624 1.8456 16.4208 1.504C16.0792 1.16239 15.6541 1.02314 15.1833 0.959838C14.7372 0.899864 5.17528 0.899882 4.50142 0.899903H4.4234Z" fill=""/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className={`${productStyle === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9" : "flex flex-col gap-7.5"}`}>
                {productosPagina.map((item, key) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={key} />
                  ) : (
                    <SingleListItem item={item} key={key} />
                  )
                )}
              </div>

              {/* ── PAGINACIÓN ── */}
              {totalPaginas > 1 && (
                <div className="flex justify-center mt-10">
                  <ul className="flex items-center gap-2">

                    {/* Anterior */}
                    <li>
                      <button
                        onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                        disabled={paginaActual === 1}
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] border border-gray-3 bg-white ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Página anterior"
                      >
                        <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.178 16.1156C12.3467 16.1156 12.4874 16.0594 12.628 15.9469C12.8811 15.6937 12.8811 15.3 12.628 15.0469L6.72178 9L12.628 2.98125C12.8811 2.72812 12.8811 2.33437 12.628 2.08125C12.3749 1.82812 11.9811 1.82812 11.728 2.08125L5.37178 8.55C5.11865 8.80312 5.11865 9.19687 5.37178 9.45L11.728 15.9187C11.8405 16.0312 12.0092 16.1156 12.178 16.1156Z" fill=""/>
                        </svg>
                      </button>
                    </li>

                    {/* Primera página si no está visible */}
                    {getPaginas()[0] > 1 && (
                      <>
                        <li>
                          <button onClick={() => setPaginaActual(1)} className="flex py-1.5 px-3.5 rounded-[3px] border border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue duration-200">1</button>
                        </li>
                        {getPaginas()[0] > 2 && <li><span className="px-2 text-dark-4">...</span></li>}
                      </>
                    )}

                    {/* Páginas visibles */}
                    {getPaginas().map((p) => (
                      <li key={p}>
                        <button
                          onClick={() => setPaginaActual(p)}
                          className={`flex py-1.5 px-3.5 rounded-[3px] border duration-200 ${
                            p === paginaActual
                              ? "bg-blue text-white border-blue"
                              : "border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue"
                          }`}
                        >
                          {p}
                        </button>
                      </li>
                    ))}

                    {/* Última página si no está visible */}
                    {getPaginas()[getPaginas().length - 1] < totalPaginas && (
                      <>
                        {getPaginas()[getPaginas().length - 1] < totalPaginas - 1 && (
                          <li><span className="px-2 text-dark-4">...</span></li>
                        )}
                        <li>
                          <button onClick={() => setPaginaActual(totalPaginas)} className="flex py-1.5 px-3.5 rounded-[3px] border border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue duration-200">{totalPaginas}</button>
                        </li>
                      </>
                    )}

                    {/* Siguiente */}
                    <li>
                      <button
                        onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
                        disabled={paginaActual === totalPaginas}
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] border border-gray-3 bg-white ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Página siguiente"
                      >
                        <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z" fill=""/>
                        </svg>
                      </button>
                    </li>

                  </ul>
                </div>
              )}

            </div>
            {/* ── CONTENIDO END ── */}

          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
