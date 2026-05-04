"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import CustomSelect from "../ShopWithSidebar/CustomSelect";
import shopData from "../Shop/shopData";

const ITEMS_POR_PAG = 21;

const ShopWithoutSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  const options = [
    { label: "Más recientes",        value: "0" },
    { label: "Precio: menor a mayor", value: "1" },
  ];

  const filtrados = busqueda
    ? shopData.filter(p => p.title.toLowerCase().includes(busqueda.toLowerCase()))
    : shopData;

  const totalPags = Math.ceil(filtrados.length / ITEMS_POR_PAG);
  const inicio = (pagina - 1) * ITEMS_POR_PAG;
  const pagItems = filtrados.slice(inicio, inicio + ITEMS_POR_PAG);

  const irPagina = (p: number) => {
    setPagina(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaginas = () => {
    const pages: number[] = [];
    for (let i = Math.max(1, pagina - 2); i <= Math.min(totalPags, pagina + 2); i++) pages.push(i);
    return pages;
  };

  return (
    <>
      <Breadcrumb title="Todos los Productos" pages={["productos"]} />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="w-full">

            {/* Barra superior */}
            <div className="rounded-lg bg-white shadow-1 px-3 py-2.5 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                    className="border border-gray-3 rounded-md px-3 py-2 text-sm outline-none focus:border-blue w-48"
                  />
                  <CustomSelect options={options} />
                  <p className="text-sm text-dark-4">
                    <span className="text-dark font-medium">{inicio + 1}–{Math.min(inicio + ITEMS_POR_PAG, filtrados.length)}</span>
                    {" "}de{" "}
                    <span className="text-dark font-medium">{filtrados.length}</span> productos
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setProductStyle("grid")}
                    className={`flex items-center justify-center w-9 h-9 rounded border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white ${productStyle === "grid" ? "bg-blue border-blue text-white" : "text-dark bg-gray-1 border-gray-3"}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
                  </button>
                  <button onClick={() => setProductStyle("list")}
                    className={`flex items-center justify-center w-9 h-9 rounded border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white ${productStyle === "list" ? "bg-blue border-blue text-white" : "text-dark bg-gray-1 border-gray-3"}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="2" rx="1"/><rect x="1" y="7" width="14" height="2" rx="1"/><rect x="1" y="12" width="14" height="2" rx="1"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div className={
              productStyle === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-7.5 sm:gap-y-9"
                : "flex flex-col gap-5"
            }>
              {pagItems.map((item, key) =>
                productStyle === "grid"
                  ? <SingleGridItem item={item} key={key} />
                  : <SingleListItem item={item} key={key} />
              )}
            </div>

            {/* PAGINACIÓN */}
            {totalPags > 1 && (
              <div className="flex justify-center mt-10">
                <ul className="flex items-center gap-1.5 flex-wrap justify-center">
                  <li>
                    <button onClick={() => irPagina(Math.max(1, pagina - 1))} disabled={pagina === 1}
                      className="w-9 h-9 rounded border border-gray-3 bg-white hover:bg-blue hover:border-blue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed ease-out duration-200 text-lg">‹</button>
                  </li>
                  {getPaginas()[0] > 1 && (
                    <><li><button onClick={() => irPagina(1)} className="py-1.5 px-3 rounded border border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue duration-200 text-sm">1</button></li>
                    {getPaginas()[0] > 2 && <li><span className="px-1 text-dark-4">...</span></li>}</>
                  )}
                  {getPaginas().map(p => (
                    <li key={p}>
                      <button onClick={() => irPagina(p)}
                        className={`py-1.5 px-3 rounded border duration-200 text-sm ${p === pagina ? "bg-blue text-white border-blue" : "border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue"}`}>
                        {p}
                      </button>
                    </li>
                  ))}
                  {getPaginas()[getPaginas().length - 1] < totalPags && (
                    <><li><span className="px-1 text-dark-4">...</span></li>
                    <li><button onClick={() => irPagina(totalPags)} className="py-1.5 px-3 rounded border border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue duration-200 text-sm">{totalPags}</button></li></>
                  )}
                  <li>
                    <button onClick={() => irPagina(Math.min(totalPags, pagina + 1))} disabled={pagina === totalPags}
                      className="w-9 h-9 rounded border border-gray-3 bg-white hover:bg-blue hover:border-blue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed ease-out duration-200 text-lg">›</button>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithoutSidebar;
