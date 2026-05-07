"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Link from "next/link";

export const Wishlist = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  return (
    <>
      <Breadcrumb title="Lista de Deseos" pages={["Lista de Deseos"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {wishlistItems.length > 0 ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
                <h2 className="font-medium text-dark text-2xl">Tu Lista de Deseos</h2>
                <p className="text-dark-4 text-sm">{wishlistItems.length} producto{wishlistItems.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="bg-white rounded-[10px] shadow-1">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="flex items-center py-5.5 px-10">
                      <div className="min-w-[83px]"></div>
                      <div className="min-w-[387px]"><p className="text-dark">Producto</p></div>
                      <div className="min-w-[205px]"><p className="text-dark">Precio unitario</p></div>
                      <div className="min-w-[265px]"><p className="text-dark">Disponibilidad</p></div>
                      <div className="min-w-[150px]"><p className="text-dark text-right">Acción</p></div>
                    </div>
                    {wishlistItems.map((item, key) => <SingleItem item={item} key={key} />)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-6">♡</p>
              <p className="text-dark-4 mb-6">Tu lista de deseos está vacía</p>
              <Link href="/shop-with-sidebar"
                className="inline-flex font-medium text-white bg-blue py-3 px-8 rounded-md hover:bg-blue-dark transition-colors">
                Explorar productos
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;
