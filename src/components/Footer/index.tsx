import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden bg-gray-1 border-t border-gray-3">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/">
              <Image src="/images/logo/logo.svg" alt="FidesKey" width={130} height={45} />
            </Link>
            <p className="text-sm text-dark-4 text-center md:text-left max-w-[200px]">
              Tu tienda de artículos de fiesta en Uruguay
            </p>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-semibold text-dark">Contacto</h3>
            <a href="tel:+59874923477" className="flex items-center gap-2 text-dark-4 hover:text-blue transition-colors text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M4.7177 3.0919C5.94388 1.80096 7.9721 2.04283 8.98569 3.47641L10.2467 5.25989C11.0574 6.40656 10.9889 8.00073 10.0214 9.0194L9.7765 9.27719C9.76142 9.31935 9.7287 9.43513 9.7609 9.65489C9.82765 10.1104 10.1793 11.0361 11.607 12.5392C13.0391 14.0469 13.9078 14.4023 14.3103 14.4677C14.484 14.4959 14.5748 14.4714 14.6038 14.4612L15.0124 14.031C15.8862 13.111 17.2485 12.9298 18.347 13.5621L20.2575 14.6617C21.8904 15.6016 22.2705 17.9008 20.9655 19.2747L19.545 20.7703C19.1016 21.2371 18.497 21.6355 17.75 21.7092C15.9261 21.8893 11.701 21.6548 7.27161 16.9915C3.13844 12.64 2.35326 8.85513 2.25401 7.00591C2.20497 6.09224 2.61224 5.30855 3.1481 4.7444L4.7177 3.0919Z" fill="#3C50E0"/></svg>
              (+598) 7492-3477
            </a>
            <a href="mailto:contacto@fideskey.com" className="flex items-center gap-2 text-dark-4 hover:text-blue transition-colors text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" stroke="#3C50E0" strokeWidth="1.5"/><path d="M2 6L12 13L22 6" stroke="#3C50E0" strokeWidth="1.5" strokeLinecap="round"/></svg>
              contacto@fideskey.com
            </a>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-semibold text-dark">Seguinos</h3>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/fideskey" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white shadow-1 flex items-center justify-center text-dark hover:text-blue hover:shadow-md transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://facebook.com/fideskey" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white shadow-1 flex items-center justify-center text-dark hover:text-blue hover:shadow-md transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://wa.me/59874923477" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white shadow-1 flex items-center justify-center text-dark hover:text-blue hover:shadow-md transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

        </div>
        <div className="border-t border-gray-3 py-5 text-center">
          <p className="text-sm text-dark-4">© {year} FidesKey. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
