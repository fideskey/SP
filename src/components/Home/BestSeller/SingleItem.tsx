"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleQuickViewUpdate = () => dispatch(updateQuickView({ ...item }));
  const handleAddToCart = () => dispatch(addItemToCart({ ...item, quantity: 1 }));
  const handleItemToWishList = () => dispatch(addItemToWishlist({ ...item, status: "available", quantity: 1 }));
  const handleProductDetails = () => dispatch(updateproductDetails({ ...item }));

  const imgSrc = item.imgs?.previews?.[0] || item.imgs?.thumbnails?.[0] || "";
  const precio = item.price > 0 ? `R$ ${item.price.toFixed(2).replace(".", ",")}` : "Consultá el precio";

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB] min-h-[403px]">
        <div className="text-center px-4 py-7.5">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Image key={i} src="/images/icons/icon-star.svg" alt="★" width={14} height={14} />)}
            </div>
            <p className="text-custom-sm">({item.reviews})</p>
          </div>
          <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5 line-clamp-2" onClick={() => handleProductDetails()}>
            <Link href="/shop-details">{item.title}</Link>
          </h3>
          <span className="font-medium text-lg text-dark">{precio}</span>
        </div>
        {imgSrc && (
          <div className="flex justify-center items-center">
            <Image src={imgSrc} alt={item.title} width={280} height={280} className="object-contain" />
          </div>
        )}
        <div className="absolute right-0 bottom-0 translate-x-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0">
          <button onClick={() => { handleQuickViewUpdate(); openModal(); }} aria-label="Vista rápida"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue">👁</button>
          <button onClick={() => handleAddToCart()} aria-label="Agregar al carrito"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue">🛒</button>
          <button onClick={() => handleItemToWishList()} aria-label="Favoritos"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue">♡</button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
