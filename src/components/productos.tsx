"use client";
import { useEffect, useState } from "react";
import "gr/app/globals.css";
export default function Productos() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("/api/productos");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                console.log(data);
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };
        fetchProductos();
    }, []);

  return (
    <section id="productos" className="p-8 bg-white">
      <h3 className="text-3xl font-bold mb-4">Nuestros Productos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              {productos.map((producto, index) => < div key={index} className="border p-1">{producto.nombre}</div>)}
      </div>
    </section>
  );
}
