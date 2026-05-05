"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    badge: "¡Nuevo!",
    titulo: "Kit Arco Decorativo Stitch",
    descripcion: "Decorá tu fiesta con los mejores artículos temáticos. Envío a Uruguay.",
    boton: "Ver productos",
    href: "/shop-with-sidebar",
    img: "https://matsumoto.vtexassets.com/arquivos/ids/203454-800-auto?width=800&height=auto&aspect=true",
    alt: "Kit Stitch",
  },
  {
    badge: "Destacado",
    titulo: "Bola Espejada Inflable 60cm",
    descripcion: "Artículos de decoración únicos para hacer de tu evento algo inolvidable.",
    boton: "Ver productos",
    href: "/shop-with-sidebar",
    img: "https://matsumoto.vtexassets.com/arquivos/ids/206129-800-auto?width=800&height=auto&aspect=true",
    alt: "Bola Espejada",
  },
  {
    badge: "Temático",
    titulo: "Kit Disfraz de Tigre 3 Piezas",
    descripcion: "Los mejores disfraces y accesorios para carnaval y fiestas temáticas.",
    boton: "Ver productos",
    href: "/shop-with-sidebar",
    img: "https://matsumoto.vtexassets.com/arquivos/ids/204342-800-auto?width=800&height=auto&aspect=true",
    alt: "Kit Tigre",
  },
];

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
              <div className="mb-4">
                <span className="inline-block bg-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {slide.badge}
                </span>
              </div>
              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                {slide.titulo}
              </h1>
              <p className="text-dark-4 text-sm leading-relaxed mb-8">
                {slide.descripcion}
              </p>
              <Link
                href={slide.href}
                className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue"
              >
                {slide.boton}
              </Link>
            </div>
            <div className="flex items-center justify-center p-6 sm:p-4">
              <Image
                src={slide.img}
                alt={slide.alt}
                width={320}
                height={320}
                className="object-contain max-h-[300px]"
                unoptimized
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
