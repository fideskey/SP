"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
// Corregido: Importación de openQuickView[cite: 1, 2]
import { openQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // Corregido: Llamada a openQuickView[cite: 1]
  const handleQuickViewUpdate = () => {
    dispatch(openQuickView({ ...item }));
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
  };

  const handleItemToWishList = () => {
    dispatch(addItemToWishlist({ ...item, status: "available", quantity: 1 }));
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
        <Image src={item.imgs.previews[0]} alt={item.title} width={250} height={250} />
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <span className="sr-only">Vista rápida</span>
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00016 5.5C6.61945 5.5 5.50016 6.61929 5.50016 8C5.50016 9.38071 6.61945 10.5 8.00016 10.5C9.38087 10.5 10.5002 9.38071 10.5002 8C10.5002 6.61929 9.38087 5.5 8.00016 5.5Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M8.00016 2.16666C4.99074 2.16666 2.96369 3.96946 1.78721 5.49791C2.96369 12.0305 4.99074 13.8333 8.00016 13.8333C11.0096 13.8333 13.0366 12.0305 14.2131 10.5021C13.0366 3.96946 11.0096 2.16666 8.00016 2.16666Z" />
            </svg>
          </button>
          <button onClick={handleAddToCart} className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white hover:bg-blue-dark">
            Añadir al carrito
          </button>
        </div>
      </div>
      <h3 className="font-medium text-dark hover:text-blue mb-1.5">
        <Link href="#">{item.title}</Link>
      </h3>
      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">${item.discountedPrice}</span>
        <span className="text-dark-4 line-through">${item.price}</span>
      </span>
    </div>
  );
};

export default ProductItem;
