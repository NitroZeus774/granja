"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Product {
    id: number
    nombre: string
    precio: number
    imagen: string
    unidad: string
    categoria: string
    cantidad?: number
    estado?: string
}

export function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch("/api/productos")

                if (!response.ok) {
                    throw new Error(`Error al cargar productos: ${response.status}`)
                }

                const productos = await response.json()
                console.log("Productos recibidos:", productos)

                // Asegurarse de que productos sea un array
                if (!Array.isArray(productos)) {
                    throw new Error("Formato de datos incorrecto")
                }

                // Filtrar solo productos disponibles para mostrar
                const productosDisponibles = productos.filter(
                    (producto: any) => producto.estado === "Disponible" && producto.cantidad > 0,
                )

                setProducts(productosDisponibles)
            } catch (error) {
                console.error("Error fetching productos:", error)
                setError("Error al cargar los productos")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="section-title text-center">Nuestros Productos Destacados</h2>
                    <div className="text-center py-8">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#5d8c47] border-r-transparent mb-4"></div>
                        <div className="text-lg text-gray-600">Cargando productos...</div>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="section-title text-center">Nuestros Productos Destacados</h2>
                    <div className="text-center py-8">
                        <div className="text-red-600 mb-4">{error}</div>
                        <Button onClick={() => window.location.reload()} className="bg-[#5d8c47] hover:bg-[#4a7038]">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">Nuestros Productos Destacados</h2>
                {products.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">No hay productos disponibles en este momento</p>
                        <Link href="/productos">
                            <Button size="lg" className="bg-[#5d8c47] hover:bg-[#4a7038] text-white">
                                Ver Catálogo Completo
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </section>
    )
}
