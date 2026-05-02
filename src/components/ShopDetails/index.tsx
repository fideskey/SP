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
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descripcion");

  const tabs = [
    { id: "descripcion",  title: "Descripción" },
    { id: "detalles",     title: "Detalles" },
    { id: "resenas",      title: "Reseñas" },
  ];

  const alreadyExist = localStorage.getItem("productDetails");
  const productFromStorage = useAppSelector(
    (state) => state.productDetailsReducer.value
  );
  const product = alreadyExist ? JSON.parse(alreadyExist) : productFromStorage;

  useEffect(() => {
    localStorage.setItem("productDetails", JSON.stringify(product));
  }, [product]);

  const handlePreviewSlider = () => {
    openPreviewModal();
  };

  return (
    <>
      <Breadcrumb title={"Detalle del Producto"} pages={["productos"]} />

      {product.title === "" ? (
        <p className="text-center py-20">Por favor seleccioná un producto.</p>
      ) : (
        <>
          <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

              {/* Categoría / Subcategoría breadcrumb */}
              {product.categoria && (
                <p className="text-sm text-gray-500 mb-4">
                  {product.categoria}
                  {product.subcategoria && (
                    <span> &rsaquo; {product.subcategoria}</span>
                  )}
                </p>
              )}

              <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">

                {/* ── IMÁGENES ── */}
                <div className="lg:max-w-[570px] w-full">
                  <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                    <button
                      onClick={handlePreviewSlider}
                      aria-label="Zoom"
                      className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 right-4 z-50"
                    >
                      <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 2.21301 12.1458 1.83331C12.1458 1.45362 12.4536 1.14581 12.8333 1.14581L12.885 1.14581C14.5696 1.1458 15.904 1.14579 16.9483 1.28619C18.023 1.43068 18.8928 1.73512 19.5788 2.42112C20.2648 3.10712 20.5693 3.97699 20.7138 5.05171C20.8542 6.09599 20.8542 7.43032 20.8541 9.11494V9.16665C20.8541 9.54634 20.5463 9.85415 20.1666 9.85415C19.787 9.85415 19.4791 9.54634 19.4791 9.16665C19.4791 7.41873 19.4777 6.17695 19.351 5.23492C19.227 4.31268 18.9945 3.78133 18.6066 3.39339C18.2186 3.00545 17.6873 2.77292 16.765 2.64893ZM1.83331 12.1458C2.21301 12.1458 2.52081 12.4536 2.52081 12.8333C2.52081 14.5812 2.52227 15.823 2.64893 16.765C2.77292 17.6873 3.00545 18.2186 3.39339 18.6066C3.78133 18.9945 4.31268 19.227 5.23492 19.351C6.17695 19.4777 7.41873 19.4791 9.16665 19.4791C9.54634 19.4791 9.85415 19.787 9.85415 20.1666C9.85415 20.5463 9.54634 20.8541 9.16665 20.8541H9.11494C7.43032 20.8542 6.09599 20.8542 5.05171 20.7138C3.97699 20.5693 3.10712 20.2648 2.42112 19.5788C1.73512 18.8928 1.43068 18.023 1.28619 16.9483C1.14579 15.904 1.1458 14.5696 1.14581 12.885L1.14581 12.8333C1.14581 12.4536 1.45362 12.1458 1.83331 12.1458ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z" fill="" />
                      </svg>
                    </button>

                    {product.imgs?.previews?.[previewImg] && (
                      <Image
                        src={product.imgs.previews[previewImg]}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Thumbnails */}
                  <div className="flex flex-wrap gap-4.5 mt-6">
                    {product.imgs?.thumbnails.map((item: string, key: number) => (
                      <button
                        onClick={() => setPreviewImg(key)}
                        key={key}
                        className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-2 shadow-1 border-2 ease-out duration-200 hover:border-blue ${key === previewImg ? "border-blue" : "border-transparent"}`}
                      >
                        <Image width={70} height={70} src={item} alt="thumbnail" className="object-contain" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── INFO DEL PRODUCTO ── */}
                <div className="max-w-[539px] w-full">

                  {/* Código FidesKey */}
                  {product.idFideskey && (
                    <p className="text-xs text-gray-400 mb-2">
                      Código: <span className="font-mono font-semibold text-gray-600">{product.idFideskey}</span>
                    </p>
                  )}

                  {/* Título */}
                  <h2 className="font-semibold text-xl xl:text-2xl text-dark mb-4">
                    {product.title}
                  </h2>

                  {/* Precio */}
                  <div className="flex items-center gap-4 mb-6">
                    {product.price > 0 ? (
                      <span className="text-2xl font-bold text-dark">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    ) : (
                      <span className="text-lg text-gray-500 italic">
                        Consultá el precio
                      </span>
                    )}
                  </div>

                  {/* Descripción corta */}
                  {product.descripcion && (
                    <p className="text-dark-4 mb-6 leading-relaxed">
                      {product.descripcion}
                    </p>
                  )}

                  {/* Colores si tiene */}
                  {product.colores && product.colores.length > 0 && (
                    <div className="mb-6">
                      <p className="font-medium text-dark mb-2">Colores disponibles:</p>
                      <div className="flex gap-2 flex-wrap">
                        {product.colores.map((color: string, i: number) => (
                          <span key={i} className="px-3 py-1 rounded-full border border-gray-3 text-sm text-dark-4">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dimensiones si tiene */}
                  {product.dimensiones && (
                    <div className="mb-6">
                      <p className="font-medium text-dark mb-1">Dimensiones:</p>
                      <p className="text-dark-4 text-sm">{product.dimensiones}</p>
                    </div>
                  )}

                  {/* Cantidad */}
                  <div className="flex items-center gap-4 mb-6">
                    <p className="font-medium text-dark">Cantidad:</p>
                    <div className="flex items-center border border-gray-3 rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-dark hover:text-blue transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-medium text-dark border-x border-gray-3">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-dark hover:text-blue transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botón agregar al carrito */}
                  <button className="w-full flex items-center justify-center gap-2 bg-blue text-white font-medium py-3.5 px-8 rounded-md hover:bg-blue-dark ease-out duration-200 mb-4">
                    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.25 7.5H17.5V5C17.5 2.519 15.481 0.5 13 0.5H9C6.519 0.5 4.5 2.519 4.5 5V7.5H0.75C0.336 7.5 0 7.836 0 8.25V19.25C0 20.493 1.007 21.5 2.25 21.5H19.75C20.993 21.5 22 20.493 22 19.25V8.25C22 7.836 21.664 7.5 21.25 7.5ZM6 5C6 3.346 7.346 2 9 2H13C14.654 2 16 3.346 16 5V7.5H6V5Z" fill="white"/>
                    </svg>
                    Agregar al carrito
                  </button>

                  {/* Info extra */}
                  <div className="border-t border-gray-3 pt-4 mt-4 space-y-2 text-sm text-dark-4">
                    <p>✅ Envío disponible a Uruguay</p>
                    <p>✅ Precios en Reales Brasileños (R$)</p>
                    <p>✅ Consultanos por combos y mayoreo</p>
                  </div>
                </div>
              </div>

              {/* ── TABS ── */}
              <div className="mt-16">
                <div className="flex gap-6 border-b border-gray-3 mb-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
                        activeTab === tab.id
                          ? "border-blue text-blue"
                          : "border-transparent text-dark-4 hover:text-dark"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                {/* Tab Descripción */}
                {activeTab === "descripcion" && (
                  <div className="text-dark-4 leading-relaxed">
                    {product.descripcion ? (
                      <p>{product.descripcion}</p>
                    ) : (
                      <p className="italic text-gray-400">Sin descripción disponible.</p>
                    )}
                  </div>
                )}

                {/* Tab Detalles */}
                {activeTab === "detalles" && (
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-4 py-2 border-b border-gray-2">
                      <span className="font-medium text-dark w-40">Código FidesKey</span>
                      <span className="text-dark-4 font-mono">{product.idFideskey || "—"}</span>
                    </div>
                    <div className="flex gap-4 py-2 border-b border-gray-2">
                      <span className="font-medium text-dark w-40">Categoría</span>
                      <span className="text-dark-4">{product.categoria || "—"}</span>
                    </div>
                    <div className="flex gap-4 py-2 border-b border-gray-2">
                      <span className="font-medium text-dark w-40">Subcategoría</span>
                      <span className="text-dark-4">{product.subcategoria || "—"}</span>
                    </div>
                    {product.dimensiones && (
                      <div className="flex gap-4 py-2 border-b border-gray-2">
                        <span className="font-medium text-dark w-40">Dimensiones</span>
                        <span className="text-dark-4">{product.dimensiones}</span>
                      </div>
                    )}
                    {product.colores && product.colores.length > 0 && (
                      <div className="flex gap-4 py-2 border-b border-gray-2">
                        <span className="font-medium text-dark w-40">Colores</span>
                        <span className="text-dark-4">{product.colores.join(", ")}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Reseñas */}
                {activeTab === "resenas" && (
                  <div className="text-dark-4 italic">
                    <p>Aún no hay reseñas para este producto.</p>
                  </div>
                )}
              </div>

            </div>
          </section>

          <RecentlyViewdItems />
          <Newsletter />
        </>
      )}
    </>
  );
};

export default ShopDetails;
