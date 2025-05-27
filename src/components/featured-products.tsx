"use client";
import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Product {
    id: number
    nombre: string
    precio: string
    imagen: string
    unidad: string
    categoria: string
}

export function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchproducts = async () => {
            const p = await fetch("/api/productos")
            const productos = await p.json()
            console.log(productos)
            setProducts(productos.productos)
        }
        fetchproducts()
    }, [])

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">Nuestros Productos Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="text-center">
                    <Link href="/productos">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-[#5d8c47] text-[#5d8c47] hover:bg-[#5d8c47] hover:text-white"
                        >
                            Ver Todos los Productos
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
