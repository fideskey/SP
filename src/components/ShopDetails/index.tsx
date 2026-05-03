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

  const productFromStore = useAppSelector((state) => state.productDetailsReducer.value);
  const [product, setProduct] = useState(productFromStore);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("productDetails");
      if (saved) setProduct(JSON.parse(saved));
      else setProduct(productFromStore);
    }
  }, [productFromStore]);

  useEffect(() => {
    if (product?.title) localStorage.setItem("productDetails", JSON.stringify(product));
  }, [product]);

  const tabs = [
    { id: "descripcion", title: "Descripción" },
    { id: "detalles", title: "Detalles" },
  ];

  if (!product?.title) return (
    <>
      <Breadcrumb title="Detalle del Producto" pages={["productos"]} />
      <p className="text-center py-20 text-dark-4">Seleccioná un producto para ver su detalle.</p>
    </>
  );

  const imgSrc = product.imgs?.previews?.[previewImg] || "";
  const precio = product.price > 0 ? `R$ ${product.price.toFixed(2).replace(".", ",")}` : "Consultá el precio";

  return (
    <>
      <Breadcrumb title="Detalle del Producto" pages={["productos"]} />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

          {product.categoria && (
            <p className="text-sm text-gray-500 mb-5">{product.categoria}{product.subcategoria && <span> › {product.subcategoria}</span>}</p>
          )}

          <div className="flex flex-col lg:flex-row gap-10 xl:gap-17.5">

            {/* IMÁGENES */}
            <div className="lg:max-w-[570px] w-full">
              <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                <button onClick={() => openPreviewModal()} aria-label="Zoom"
                  className="w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 right-4 z-50">
                  <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.11493 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z" fill=""/>
                  </svg>
                </button>
                {imgSrc && <Image src={imgSrc} alt={product.title} width={450} height={450} className="object-contain" />}
              </div>
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
              {product.idFideskey && (
                <p className="text-xs text-gray-400 mb-2 font-mono">Código: <span className="font-semibold text-gray-600">{product.idFideskey}</span></p>
              )}
              <h2 className="font-semibold text-xl xl:text-2xl text-dark mb-5">{product.title}</h2>
              <div className="mb-6">
                <span className={`text-2xl font-bold ${product.price > 0 ? "text-dark" : "text-gray-500 italic text-lg"}`}>{precio}</span>
              </div>
              {product.descripcion && <p className="text-dark-4 mb-6 leading-relaxed">{product.descripcion}</p>}
              <div className="flex items-center gap-4 mb-6">
                <p className="font-medium text-dark">Cantidad:</p>
                <div className="flex items-center border border-gray-3 rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-dark hover:text-blue transition-colors">−</button>
                  <span className="px-4 py-2 font-medium text-dark border-x border-gray-3">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-dark hover:text-blue transition-colors">+</button>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-blue text-white font-medium py-3.5 px-8 rounded-md hover:bg-opacity-90 ease-out duration-200 mb-4">
                🛒 Agregar al carrito
              </button>
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
              {tabs.map(tab => (
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
                {[["Código FidesKey", product.idFideskey], ["Categoría", product.categoria], ["Subcategoría", product.subcategoria], ["Dimensiones", product.dimensiones]]
                  .filter(([, v]) => v)
                  .map(([label, valor]) => (
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
