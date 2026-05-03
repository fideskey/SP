"use client";
import React from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import Image from "next/image";
// Importamos la acción que añadimos en el Paso 1
import { resetQuickView } from "@/redux/features/quickView-slice";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  
  // Obtenemos el producto seleccionado desde el estado global[cite: 1]
  // Cambiamos state.quickView por state.quickViewReducer
const product = useSelector((state: RootState) => state.quickViewReducer.value);

  const handleClose = () => {
    dispatch(resetQuickView()); // Limpiamos Redux para que no queden datos viejos[cite: 1]
    closeModal(); // Cerramos la ventana visualmente
  };

  // Si el modal no debe estar abierto o no hay producto, no renderizamos nada
  if (!isModalOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="relative bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-dark hover:text-blue font-bold"
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image 
              src={product.imgs.previews[0]} 
              alt={product.title} 
              width={300} 
              height={300} 
              className="rounded-lg object-contain"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-2 text-dark">{product.title}</h2>
            <p className="text-xl font-semibold text-blue mb-4">${product.discountedPrice}</p>
            <p className="text-dark-4 text-sm mb-6 line-clamp-4">
           // CAMBIO: de product.description a product.descripcion
<p className="text-dark-4 text-sm mb-6 line-clamp-4">
  {product.descripcion}
</p>
            </p>
            <button 
              onClick={handleClose}
              className="w-full py-3 bg-blue text-white rounded-md hover:bg-blue-dark transition-colors"
            >
              Cerrar Vista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
