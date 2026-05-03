"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";

const ProductItem = ({ item }: { item: Product }) => {
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
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4">
        {imgSrc && <Image src={imgSrc} alt={item.title} width={250} height={250} className="object-contain" />}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button onClick={() => { openModal(); handleQuickViewUpdate(); }} aria-label="Vista rápida"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue">
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8 5.5C6.619 5.5 5.5 6.619 5.5 8C5.5 9.381 6.619 10.5 8 10.5C9.381 10.5 10.5 9.381 10.5 8C10.5 6.619 9.381 5.5 8 5.5ZM6.5 8C6.5 7.172 7.172 6.5 8 6.5C8.828 6.5 9.5 7.172 9.5 8C9.5 8.828 8.828 9.5 8 9.5C7.172 9.5 6.5 8.828 6.5 8Z" fill=""/><path fillRule="evenodd" clipRule="evenodd" d="M8 2.167C4.991 2.167 2.964 3.969 1.787 5.498L1.766 5.525C1.5 5.871 1.255 6.189 1.089 6.566C0.91 6.969 0.833 7.408 0.833 8C0.833 8.592 0.91 9.031 1.089 9.434C1.255 9.811 1.5 10.129 1.766 10.475L1.787 10.502C2.964 12.031 4.991 13.833 8 13.833C11.009 13.833 13.036 12.031 14.213 10.502L14.234 10.475C14.5 10.129 14.745 9.811 14.912 9.434C15.09 9.031 15.167 8.592 15.167 8C15.167 7.408 15.09 6.969 14.912 6.566C14.745 6.189 14.5 5.871 14.234 5.525L14.213 5.498C13.036 3.969 11.009 2.167 8 2.167Z" fill=""/></svg>
          </button>
          <button onClick={() => handleAddToCart()}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark">
            Agregar
          </button>
          <button onClick={() => handleItemToWishList()} aria-label="Favoritos"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue">
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.749 2.949C2.643 3.455 1.833 4.657 1.833 6.091C1.833 7.556 2.433 8.685 3.292 9.653C4 10.451 4.858 11.112 5.694 11.756C5.893 11.91 6.09 12.062 6.284 12.215C6.635 12.491 6.947 12.734 7.249 12.91C7.551 13.086 7.794 13.167 8 13.167C8.206 13.167 8.449 13.086 8.751 12.91C9.052 12.734 9.365 12.491 9.716 12.215C9.91 12.062 10.107 11.91 10.306 11.756C11.142 11.112 12 10.451 12.708 9.653C13.567 8.685 14.167 7.556 14.167 6.091C14.167 4.657 13.356 3.455 12.25 2.949C11.176 2.458 9.732 2.588 8.36 4.014C8.266 4.112 8.136 4.167 8 4.167C7.864 4.167 7.734 4.112 7.64 4.014C6.268 2.588 4.824 2.458 3.749 2.949Z" fill=""/></svg>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2.5 mb-2">
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
  );
};

export default ProductItem;
