"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import shopData from "../Shop/shopData";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";

const ITEMS_POR_PAG = 20;
const CATEGORIAS = ["Todas","Globos","Decoración","Fiestas Temáticas","Recuerdos","Carnaval y Disfraces","Cotillón","Vajilla Descartable","Velas","Navidad","Fechas Especiales","Cintas y Lazos","Papelería"];

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const options = [
    { label: "Más recientes", value: "0" },
    { label: "Precio: menor a mayor", value: "1" },
  ];

  const filtrados = shopData.filter(p => {
    const matchCat = categoria === "Todas" || (p as any).categoria === categoria;
    const matchBus = busqueda === "" || p.title.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBus;
  });

  const totalPags = Math.ceil(filtrados.length / ITEMS_POR_PAG);
  const inicio = (pagina - 1) * ITEMS_POR_PAG;
  const pagItems = filtrados.slice(inicio, inicio + ITEMS_POR_PAG);

  const cambiarCat = (c: string) => { setCategoria(c); setPagina(1); setSidebarOpen(false); };

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
          <div className="flex gap-7.5">

            {/* SIDEBAR */}
            <div className={`fixed xl:static xl:z-auto z-9999 left-0 top-0 max-w-[280px] xl:max-w-[250px] w-full bg-white xl:bg-transparent p-5 xl:p-0 h-screen xl:h-auto overflow-y-auto xl:overflow-visible ease-out duration-200 ${sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full xl:translate-x-0"}`}>
              <div className="flex flex-col gap-5">
                <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                  <p className="font-medium text-dark mb-3">Buscar</p>
                  <input type="text" placeholder="Buscar productos..." value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                    className="w-full border border-gray-3 rounded-md px-3 py-2 text-sm outline-none focus:border-blue" />
                </div>
                <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                  <p className="font-medium text-dark mb-3">Categorías</p>
                  <ul className="flex flex-col gap-1">
                    {CATEGORIAS.map(c => (
                      <li key={c}>
                        <button onClick={() => cambiarCat(c)}
                          className={`text-sm w-full text-left py-1.5 px-2 rounded transition-colors ${categoria === c ? "bg-blue text-white" : "text-dark-4 hover:text-blue hover:bg-gray-1"}`}>
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CONTENIDO */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="xl:hidden flex items-center gap-2 text-sm text-dark border border-gray-3 rounded-md px-3 py-1.5">
                      ☰ Filtros
                    </button>
                    <CustomSelect options={options} />
                    <p className="text-sm text-dark-4">
                      Mostrando <span className="text-dark font-medium">{inicio + 1}–{Math.min(inicio + ITEMS_POR_PAG, filtrados.length)}</span> de <span className="text-dark font-medium">{filtrados.length}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setProductStyle("grid")} className={`flex items-center justify-center w-9 h-9 rounded border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white ${productStyle === "grid" ? "bg-blue border-blue text-white" : "text-dark bg-gray-1 border-gray-3"}`}>⊞</button>
                    <button onClick={() => setProductStyle("list")} className={`flex items-center justify-center w-9 h-9 rounded border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white ${productStyle === "list" ? "bg-blue border-blue text-white" : "text-dark bg-gray-1 border-gray-3"}`}>☰</button>
                  </div>
                </div>
              </div>

              <div className={productStyle === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9" : "flex flex-col gap-7.5"}>
                {pagItems.map((item, key) => productStyle === "grid" ? <SingleGridItem item={item} key={key} /> : <SingleListItem item={item} key={key} />)}
              </div>

              {/* PAGINACIÓN */}
              {totalPags > 1 && (
                <div className="flex justify-center mt-10">
                  <ul className="flex items-center gap-2 flex-wrap">
                    <li><button onClick={() => setPagina(Math.max(1, pagina - 1))} disabled={pagina === 1} className="w-9 h-9 rounded border border-gray-3 bg-white hover:bg-blue hover:border-blue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed ease-out duration-200">‹</button></li>
                    {getPaginas()[0] > 1 && <><li><button onClick={() => setPagina(1)} className="py-1.5 px-3 rounded border border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue duration-200">1</button></li>{getPaginas()[0] > 2 && <li><span className="px-2 text-dark-4">...</span></li>}</>}
                    {getPaginas().map(p => <li key={p}><button onClick={() => setPagina(p)} className={`py-1.5 px-3 rounded border duration-200 ${p === pagina ? "bg-blue text-white border-blue" : "border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue"}`}>{p}</button></li>)}
                    {getPaginas()[getPaginas().length - 1] < totalPags && <><li><span className="px-2 text-dark-4">...</span></li><li><button onClick={() => setPagina(totalPags)} className="py-1.5 px-3 rounded border border-gray-3 bg-white hover:bg-blue hover:text-white hover:border-blue duration-200">{totalPags}</button></li></>}
                    <li><button onClick={() => setPagina(Math.min(totalPags, pagina + 1))} disabled={pagina === totalPags} className="w-9 h-9 rounded border border-gray-3 bg-white hover:bg-blue hover:border-blue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed ease-out duration-200">›</button></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-9998 xl:hidden" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default ShopWithSidebar;
