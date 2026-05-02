/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // AtacadoDaFesta + ExtraFesta (Tray Commerce)
      { protocol: "https", hostname: "images.tcdn.com.br" },
      { protocol: "https", hostname: "*.tcdn.com.br" },
      // Matsumoto (VTEX)
      { protocol: "https", hostname: "*.vtexassets.com" },
      { protocol: "https", hostname: "*.vteximg.com.br" },
      { protocol: "https", hostname: "lojasmatsumoto.vtexassets.com" },
      // Elo7
      { protocol: "https", hostname: "*.elo7.com.br" },
      { protocol: "https", hostname: "img.elo7.com.br" },
      { protocol: "https", hostname: "images.elo7.com.br" },
      // Cromus / SemaanPari
      { protocol: "https", hostname: "*.cromus.com.br" },
      { protocol: "https", hostname: "*.semaanpari.com.br" },
      // Genérico para cualquier otro proveedor
      { protocol: "https", hostname: "**" },
    ],
  },
};

module.exports = nextConfig;
