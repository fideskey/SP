"use client";
import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCartItemQuantity } from "@/redux/features/cart-slice";
import Image from "next/image";

const SingleItem = ({ item }: { item: any }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = () => dispatch(removeItemFromCart(item.id));
  const handleIncrease = () => {
    const q = quantity + 1;
    setQuantity(q);
    dispatch(updateCartItemQuantity({ id: item.id, quantity: q }));
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      const q = quantity - 1;
      setQuantity(q);
      dispatch(updateCartItemQuantity({ id: item.id, quantity: q }));
    }
  };

  const precio = item.price > 0 ? `R$ ${item.price.toFixed(2).replace(".", ",")}` : "A cotizar";
  const subtotal = item.price > 0 ? `R$ ${(item.price * quantity).toFixed(2).replace(".", ",")}` : "A cotizar";

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5 flex-wrap gap-4">
      <div className="min-w-[400px] flex items-center gap-5.5">
        <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5 overflow-hidden">
          {item.imgs?.thumbnails?.[0] && (
            <Image width={80} height={80} src={item.imgs.thumbnails[0]} alt={item.title} className="object-contain" />
          )}
        </div>
        <h3 className="text-dark text-sm">{item.title}</h3>
      </div>
      <div className="min-w-[180px]"><p className="text-dark">{precio}</p></div>
      <div className="min-w-[200px]">
        <div className="w-max flex items-center rounded-md border border-gray-3">
          <button onClick={handleDecrease} aria-label="Reducir" className="flex items-center justify-center w-11.5 h-11.5 hover:text-blue transition-colors">−</button>
          <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">{quantity}</span>
          <button onClick={handleIncrease} aria-label="Aumentar" className="flex items-center justify-center w-11.5 h-11.5 hover:text-blue transition-colors">+</button>
        </div>
      </div>
      <div className="min-w-[150px]"><p className="text-dark">{subtotal}</p></div>
      <div className="min-w-[50px] flex justify-end">
        <button onClick={handleRemove} aria-label="Eliminar"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark hover:bg-red-light-6 hover:border-red-light-4 hover:text-red transition-colors">
          🗑
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
