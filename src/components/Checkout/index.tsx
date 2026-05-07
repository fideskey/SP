"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const [form, setForm] = useState({
    nombre: "", apellido: "", empresa: "", pais: "Uruguay",
    ciudad: "", direccion: "", telefono: "", email: "", notas: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.telefono) {
      setError("Por favor completá los campos obligatorios.");
      return;
    }
    if (cartItems.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }
    setEnviando(true);
    setError("");

    // Armar detalle de productos
    const productos = cartItems.map(item =>
      `• ${item.title} x${item.quantity} = ${item.price > 0 ? "R$ " + (item.price * item.quantity).toFixed(2).replace(".", ",") : "A cotizar"}`
    ).join("\n");

    const totalTexto = totalPrice > 0 ? `R$ ${totalPrice}` : "A cotizar";

    // Enviar por EmailJS
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        "service_n4oo1t6",   // ← Reemplazá con tu Service ID de EmailJS
        "rz7br1j",  // ← Reemplazá con tu Template ID de EmailJS
        {
          to_email: "fideskey@outlook.com",
          from_name: `${form.nombre} ${form.apellido}`,
          from_email: form.email,
          telefono: form.telefono,
          empresa: form.empresa || "—",
          ciudad: form.ciudad,
          pais: form.pais,
          direccion: form.direccion,
          productos: productos,
          total: totalTexto,
          notas: form.notas || "—",
        },
        "E3W2Avz2xryjQ6Vrd"   // ← Reemplazá con tu Public Key de EmailJS
      );
      setEnviado(true);
    } catch (err) {
      setError("Hubo un error al enviar. Por favor contactanos directamente.");
    } finally {
      setEnviando(false);
    }
  };

  const inputClass = "rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20";

  if (enviado) {
    return (
      <>
        <Breadcrumb title="Cotización" pages={["cotización"]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[600px] mx-auto px-4 text-center">
            <div className="bg-white rounded-[10px] shadow-1 p-12">
              <p className="text-5xl mb-6">✅</p>
              <h2 className="font-semibold text-2xl text-dark mb-4">¡Cotización enviada!</h2>
              <p className="text-dark-4 mb-6">
                Recibimos tu solicitud. Te contactaremos a <strong>{form.email}</strong> o al <strong>{form.telefono}</strong> a la brevedad.
              </p>
              <a href="/" className="inline-flex font-medium text-white bg-blue py-3 px-8 rounded-md hover:bg-blue-dark transition-colors">
                Volver al inicio
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb title="Solicitar Cotización" pages={["cotización"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">

              {/* IZQUIERDA - Datos del cliente */}
              <div className="lg:max-w-[670px] w-full">
                <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
                  Tus datos de contacto
                </h2>

                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                  {/* Nombre y Apellido */}
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label className="block mb-2.5">Nombre <span className="text-red">*</span></label>
                      <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" className={inputClass} required />
                    </div>
                    <div className="w-full">
                      <label className="block mb-2.5">Apellido <span className="text-red">*</span></label>
                      <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Tu apellido" className={inputClass} />
                    </div>
                  </div>

                  {/* Empresa */}
                  <div className="mb-5">
                    <label className="block mb-2.5">Empresa (opcional)</label>
                    <input type="text" name="empresa" value={form.empresa} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* País */}
                  <div className="mb-5">
                    <label className="block mb-2.5">País <span className="text-red">*</span></label>
                    <div className="relative">
                      <select name="pais" value={form.pais} onChange={handleChange}
                        className="w-full bg-gray-1 rounded-md border border-gray-3 text-dark py-3 pl-5 pr-9 appearance-none outline-none focus:border-transparent focus:ring-2 focus:ring-blue/20">
                        <option>Uruguay</option>
                        <option>Argentina</option>
                        <option>Brasil</option>
                        <option>Paraguay</option>
                        <option>Chile</option>
                        <option>Otro</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-4">▾</span>
                    </div>
                  </div>

                  {/* Ciudad */}
                  <div className="mb-5">
                    <label className="block mb-2.5">Ciudad <span className="text-red">*</span></label>
                    <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* Dirección */}
                  <div className="mb-5">
                    <label className="block mb-2.5">Dirección</label>
                    <input type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle y número" className={inputClass} />
                  </div>

                  {/* Teléfono */}
                  <div className="mb-5">
                    <label className="block mb-2.5">Teléfono / WhatsApp <span className="text-red">*</span></label>
                    <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} className={inputClass} required />
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label className="block mb-2.5">Email <span className="text-red">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} required />
                  </div>
                </div>

                {/* Notas */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <label className="block mb-2.5">Notas adicionales (opcional)</label>
                  <textarea name="notas" value={form.notas} onChange={handleChange} rows={4}
                    placeholder="Cualquier detalle especial sobre tu pedido..."
                    className={inputClass} />
                </div>
              </div>

              {/* DERECHA - Resumen del pedido */}
              <div className="max-w-[455px] w-full">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Tu pedido</h3>
                  </div>
                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <h4 className="font-medium text-dark">Producto</h4>
                      <h4 className="font-medium text-dark text-right">Subtotal</h4>
                    </div>

                    {cartItems.length > 0 ? cartItems.map((item, key) => (
                      <div key={key} className="flex items-center justify-between py-4 border-b border-gray-3">
                        <p className="text-dark text-sm max-w-[250px] leading-snug">
                          {item.title} <span className="text-dark-4">x{item.quantity}</span>
                        </p>
                        <p className="text-dark text-right text-sm flex-shrink-0 ml-4">
                          {item.price > 0 ? `R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}` : "A cotizar"}
                        </p>
                      </div>
                    )) : (
                      <p className="text-dark-4 py-5 text-sm">No hay productos en el carrito.</p>
                    )}

                    <div className="flex items-center justify-between pt-5">
                      <p className="font-medium text-lg text-dark">Total estimado</p>
                      <p className="font-medium text-lg text-dark text-right">
                        {totalPrice > 0 ? `R$ ${totalPrice}` : "A cotizar"}
                      </p>
                    </div>

                    <p className="text-xs text-dark-4 mt-2">
                      * Los precios son en Reales Brasileños (R$). Te enviaremos el precio final en pesos uruguayos.
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-white shadow-1 rounded-[10px] p-6 mt-5">
                  <p className="font-medium text-dark mb-3">¿Cómo funciona?</p>
                  <ul className="text-sm text-dark-4 space-y-2">
                    <li>✅ Completás el formulario con tus datos</li>
                    <li>✅ Nos llega tu solicitud con los productos</li>
                    <li>✅ Te contactamos con precio final en UYU</li>
                    <li>✅ Coordinamos el pago y envío</li>
                  </ul>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-light-6 border border-red-light-4 text-red rounded-md p-4 mt-5 text-sm">
                    {error}
                  </div>
                )}

                {/* Botón */}
                <button type="submit" disabled={enviando || cartItems.length === 0}
                  className="w-full flex justify-center font-medium text-white bg-blue py-3.5 px-6 rounded-md hover:bg-blue-dark transition-colors mt-7.5 disabled:opacity-60 disabled:cursor-not-allowed">
                  {enviando ? "Enviando..." : "Solicitar cotización →"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
