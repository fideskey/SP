"use client";
import React from "react";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
// CAMBIO CLAVE: Cambiamos updateQuickView por openQuickView[cite: 1, 2]
import { openQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import Image from "next/image";
import Link from "next/link";
import { useModalContext } from "@/app/context/QuickViewModalContext";

const SingleItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // CAMBIO CLAVE: Usamos la función correcta que definimos en el slice[cite: 1]
  const handleQuickViewUpdate = () => {
    dispatch(openQuickView({ ...item }));
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20 rounded-lg bg-white overflow-hidden shadow-1 flex-shrink-0">
        <Image 
          src={item.imgs.previews[0]} 
          alt={item.title} 
          fill 
          className="object-contain p-2" 
        />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium text-dark hover:text-blue mb-1">
          <Link href={`/shop/${item.id}`}>{item.title}</Link>
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-dark font-medium">${item.discountedPrice}</span>
          <span className="text-dark-4 line-through text-sm">${item.price}</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { 
              openModal(); 
              handleQuickViewUpdate(); 
            }} 
            className="text-xs text-blue hover:underline"
          >
            Vista rápida
          </button>
          <button 
            onClick={handleAddToCart} 
            className="text-xs text-blue hover:underline"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
