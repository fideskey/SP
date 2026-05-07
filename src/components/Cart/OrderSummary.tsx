import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="lg:max-w-[455px] w-full">
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Resumen del pedido</h3>
        </div>
        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <h4 className="font-medium text-dark">Producto</h4>
            <h4 className="font-medium text-dark text-right">Subtotal</h4>
          </div>
          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
              <p className="text-dark">{item.title}</p>
              <p className="text-dark text-right">
                R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-5">
            <p className="font-medium text-lg text-dark">Total</p>
            <p className="font-medium text-lg text-dark text-right">R$ {totalPrice}</p>
          </div>
          <Link href="/checkout"
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md hover:bg-blue-dark mt-7.5 transition-colors">
            Solicitar cotización
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
