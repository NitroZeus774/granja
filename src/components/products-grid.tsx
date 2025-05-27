"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"

interface Product {
    id: number
    nombre: string
    precio: string
    imagen: string
    unidad: string
    categoria: string
}

interface ProductsGridProps {
    categoria?: string
    orden?: string
}

export function ProductsGrid({ categoria, orden }: ProductsGridProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulated products data - in real app, fetch from API
        const allProducts: Product[] = [
            {
                id: 1,
                nombre: "Tomates Orgánicos",
                precio: 8500,
                imagen: "/placeholder.svg?height=200&width=200",
                unidad: "kg",
                categoria: "Verduras",
            }
        ]

        let filteredProducts = allProducts

        // Filter by category
        if (categoria && categoria !== "todos") {
            filteredProducts = filteredProducts.filter(
                (product) => product.categoria.toLowerCase() === categoria.toLowerCase(),
            )
        }

        // Sort products
        if (orden) {
            switch (orden) {
                case "precio-asc":
                    filteredProducts.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio))
                    break
                case "precio-desc":
                    filteredProducts.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio))
                    break
                case "nombre":
                    filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre))
                    break
                default:
                    break
            }
        }

        setProducts(filteredProducts)
        setLoading(false)
    }, [categoria, orden])

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
                        <div className="bg-gray-300 h-48 rounded mb-4"></div>
                        <div className="bg-gray-300 h-4 rounded mb-2"></div>
                        <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500">Intenta con una categoría diferente</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#5d8c47]">
                    {categoria && categoria !== "todos"
                        ? `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`
                        : "Todos los Productos"}
                </h2>
                <p className="text-gray-600">{products.length} productos encontrados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
