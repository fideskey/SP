"use client";
import React, { useRef } from "react";
import Link from "next/link";

const categorias = [
  {
    id: 1, title: "Globos", href: "/shop-with-sidebar",
    emoji: "🎈",
    color: "from-pink-100 to-pink-200",
  },
  {
    id: 2, title: "Decoración", href: "/shop-with-sidebar",
    emoji: "🎀",
    color: "from-purple-100 to-purple-200",
  },
  {
    id: 3, title: "Fiestas Temáticas", href: "/shop-with-sidebar",
    emoji: "🎭",
    color: "from-blue-100 to-blue-200",
  },
  {
    id: 4, title: "Recuerdos", href: "/shop-with-sidebar",
    emoji: "🎁",
    color: "from-yellow-100 to-yellow-200",
  },
  {
    id: 5, title: "Carnaval y Disfraces", href: "/shop-with-sidebar",
    emoji: "🎪",
    color: "from-orange-100 to-orange-200",
  },
  {
    id: 6, title: "Cotillón", href: "/shop-with-sidebar",
    emoji: "🎉",
    color: "from-green-100 to-green-200",
  },
  {
    id: 7, title: "Vajilla Descartable", href: "/shop-with-sidebar",
    emoji: "🥂",
    color: "from-cyan-100 to-cyan-200",
  },
  {
    id: 8, title: "Velas", href: "/shop-with-sidebar",
    emoji: "🕯️",
    color: "from-red-100 to-red-200",
  },
];

const Categories = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

        {/* Título */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#3C50E0" strokeWidth="1.5"/>
                <path d="M10 6.66667V10L12.5 12.5" stroke="#3C50E0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Categorías
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Explorá por categoría
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-gray-3 bg-white flex items-center justify-center hover:bg-blue hover:border-blue hover:text-white transition-colors">
              ‹
            </button>
            <button onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-gray-3 bg-white flex items-center justify-center hover:bg-blue hover:border-blue hover:text-white transition-colors">
              ›
            </button>
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {categorias.map((cat) => (
            <Link key={cat.id} href={cat.href}
              className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer">
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center text-5xl shadow-sm group-hover:shadow-md transition-shadow`}>
                {cat.emoji}
              </div>
              <p className="text-sm font-medium text-dark group-hover:text-blue transition-colors text-center max-w-[100px]">
                {cat.title}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
