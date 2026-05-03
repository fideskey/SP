"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import RecentlyViewdItems from "./RecentlyViewd";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";

const ShopDetails = () => {
  const { openPreviewModal } = usePreviewSlider();
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity]     = useState(1);
  const [activeTab, setActiveTab]   = useState("descripcion");

  const alreadyExist    = typeof window !== "undefined" ? localStorage.getItem("productDetails") : null;
  const productFromStore = useAppSelector((state) => state.productDetailsReducer.value);
  const product          = alreadyExist ? JSON.parse(alreadyExist) : productFromStore;

  useEffect(() => {
    if (product) localStorage.setItem("productDetails", JSON.stringify(product));
  }, [product]);

  const tabs = [
    { id: "descripcion", title: "Descripción" },
    { id: "detalles",    title: "Detalles" },
  ];

  if (!product?.title) return (
    <><Breadcrumb title="Detalle del Producto" pages={["productos"]} /><p className="text-center py-20">Seleccioná un producto para ver su detalle.</p></>
  );

  return (
    <>
      <Breadcrumb title="Detalle del Producto" pages={["productos"]} />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

          {/* Breadcrumb de categoría */}
          {product.categoria && (
            <p className="text-sm text-gray-500 mb-5">
              {product.categoria}{product.subcategoria && <span> › {product.subcategoria}</span>}
            </p>
          )}

          <div className="flex flex-col lg:flex-row gap-10 xl:gap-17.5">

            {/* IMÁGENES */}
            <div className="lg:max-w-[570px] w-full">
              <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                <button onClick={() => openPreviewModal()} aria-label="Zoom"
                  className="w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 right-4 z-50">
                  🔍
                </button>
                {product.imgs?.previews?.[previewImg] && (
                  <Image src={product.imgs.previews[previewImg]} alt={product.title} width={450} height={450} className="object-contain" />
                )}
              </div>
              {/* Thumbnails */}
              <div className="flex flex-wrap gap-3 mt-5">
                {product.imgs?.thumbnails.map((img: string, key: number) => (
                  <button key={key} onClick={() => setPreviewImg(key)}
                    className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-2 border-2 ease-out duration-200 hover:border-blue ${key === previewImg ? "border-blue" : "border-transparent"}`}>
                    <Image width={70} height={70} src={img} alt="thumbnail" className="object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* INFO */}
            <div className="max-w-[539px] w-full">
              {/* Código */}
              {product.idFideskey && (
                <p className="text-xs text-gray-400 mb-2 font-mono">
                  Código: <span className="font-semibold text-gray-600">{product.idFideskey}</span>
                </p>
              )}

              {/* Título */}
              <h2 className="font-semibold text-xl xl:text-2xl text-dark mb-5">{product.title}</h2>

              {/* Precio */}
              <div className="mb-6">
                {product.price > 0 ? (
                  <span className="text-2xl font-bold text-dark">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                ) : (
                  <span className="text-lg text-gray-500 italic">Consultá el precio</span>
                )}
              </div>

              {/* Descripción corta */}
              {product.descripcion && (
                <p className="text-dark-4 mb-6 leading-relaxed">{product.descripcion}</p>
              )}

              {/* Cantidad */}
              <div className="flex items-center gap-4 mb-6">
                <p className="font-medium text-dark">Cantidad:</p>
                <div className="flex items-center border border-gray-3 rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-dark hover:text-blue transition-colors">−</button>
                  <span className="px-4 py-2 font-medium text-dark border-x border-gray-3">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-dark hover:text-blue transition-colors">+</button>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-blue text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-90 ease-out duration-200">
                  🛒 Agregar al carrito
                </button>
                <button className="w-12 h-12 flex items-center justify-center border border-gray-3 rounded-md hover:border-blue hover:text-blue transition-colors" aria-label="Lista de deseos">
                  ♡
                </button>
              </div>

              {/* Info extra */}
              <div className="border-t border-gray-3 pt-4 space-y-2 text-sm text-dark-4">
                <p>✅ Envío disponible a Uruguay</p>
                <p>✅ Precios en Reales Brasileños (R$)</p>
                <p>✅ Consultanos por combos y mayoreo</p>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="mt-16">
            <div className="flex gap-6 border-b border-gray-3 mb-8">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 font-medium text-sm transition-colors border-b-2 -mb-px ${activeTab === tab.id ? "border-blue text-blue" : "border-transparent text-dark-4 hover:text-dark"}`}>
                  {tab.title}
                </button>
              ))}
            </div>

            {activeTab === "descripcion" && (
              <div className="text-dark-4 leading-relaxed">
                {product.descripcion ? <p>{product.descripcion}</p> : <p className="italic text-gray-400">Sin descripción disponible.</p>}
              </div>
            )}

            {activeTab === "detalles" && (
              <div className="space-y-3 text-sm">
                {[
                  ["Código FidesKey", product.idFideskey],
                  ["Categoría",       product.categoria],
                  ["Subcategoría",    product.subcategoria],
                  ["Dimensiones",     product.dimensiones],
                ].filter(([,v]) => v).map(([label, valor]) => (
                  <div key={label} className="flex gap-4 py-2 border-b border-gray-2">
                    <span className="font-medium text-dark w-44">{label}</span>
                    <span className="text-dark-4 font-mono">{valor}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
      <RecentlyViewdItems />
      <Newsletter />
    </>
  );
};

export default ShopDetails;
