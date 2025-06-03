"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

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

interface ProductsGridProps {
    searchTerm?: string
    selectedCategory?: string
}

export function ProductsGrid({ searchTerm = "", selectedCategory = "" }: ProductsGridProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<string[]>([])
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)
    const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory)

    // Función para obtener productos
    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch("/api/productos")

            if (!response.ok) {
                throw new Error(`Error al cargar productos: ${response.status}`)
            }

            const productos = await response.json()

            // Asegurarse de que productos sea un array válido
            if (!Array.isArray(productos)) {
                console.error("Datos recibidos no son un array:", productos)
                setProducts([])
                setFilteredProducts([])
                return
            }

            // Validar y limpiar datos de productos
            const productosValidados = productos
                .filter((producto: any) => producto && typeof producto === "object")
                .map((producto: any) => ({
                    id: Number(producto.id) || 0,
                    nombre: String(producto.nombre || "Producto sin nombre"),
                    precio: Number(producto.precio) || 0,
                    imagen: String(producto.imagen || "/placeholder.svg?height=300&width=300"),
                    unidad: String(producto.unidad || "unidad"),
                    categoria: String(producto.categoria || "Sin categoría"),
                    cantidad: Number(producto.cantidad) || 0,
                    estado: String(producto.estado || "Disponible"),
                }))
                .filter((producto: Product) => producto.id > 0) // Solo productos con ID válido

            setProducts(productosValidados)
            setFilteredProducts(productosValidados)

            // Extraer categorías únicas
            const uniqueCategories = Array.from(new Set(productosValidados.map((p: Product) => p.categoria).filter(Boolean)))
            setCategories(uniqueCategories)
        } catch (error) {
            console.error("Error fetching productos:", error)
            setError("Error al cargar los productos")
            setProducts([])
            setFilteredProducts([])
        } finally {
            setLoading(false)
        }
    }

    // Función para filtrar productos
    const filterProducts = () => {
        if (!Array.isArray(products)) {
            setFilteredProducts([])
            return
        }

        let filtered = [...products]

        // Filtrar por término de búsqueda
        if (localSearchTerm.trim()) {
            filtered = filtered.filter(
                (product) =>
                    product.nombre.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                    product.categoria.toLowerCase().includes(localSearchTerm.toLowerCase()),
            )
        }

        // Filtrar por categoría
        if (localSelectedCategory && localSelectedCategory !== "all") {
            filtered = filtered.filter((product) => product.categoria === localSelectedCategory)
        }

        // Solo mostrar productos disponibles
        filtered = filtered.filter((product) => product.estado === "Disponible" && product.cantidad > 0)

        setFilteredProducts(filtered)
    }

    // Efectos
    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        filterProducts()
    }, [products, localSearchTerm, localSelectedCategory])

    useEffect(() => {
        setLocalSearchTerm(searchTerm)
    }, [searchTerm])

    useEffect(() => {
        setLocalSelectedCategory(selectedCategory)
    }, [selectedCategory])

    // Renderizado de estados de carga y error
    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#5d8c47] border-r-transparent mb-4"></div>
                <div className="text-lg text-gray-600">Cargando productos...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">{error}</div>
                <Button onClick={fetchProducts} className="bg-[#5d8c47] hover:bg-[#4a7038]">
                    Reintentar
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Buscar productos..."
                            value={localSearchTerm}
                            onChange={(e) => setLocalSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
                <div className="md:w-48">
                    <Select value={localSelectedCategory} onValueChange={setLocalSelectedCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las categorías</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Resultados */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">
                    {filteredProducts?.length || 0} producto{(filteredProducts?.length || 0) !== 1 ? "s" : ""} encontrado
                    {(filteredProducts?.length || 0) !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Grid de productos */}
            {!filteredProducts || filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                        {localSearchTerm || localSelectedCategory
                            ? "No se encontraron productos que coincidan con los filtros"
                            : "No hay productos disponibles"}
                    </div>
                    {(localSearchTerm || localSelectedCategory) && (
                        <Button
                            onClick={() => {
                                setLocalSearchTerm("")
                                setLocalSelectedCategory("")
                            }}
                            variant="outline"
                            className="border-[#5d8c47] text-[#5d8c47] hover:bg-[#5d8c47] hover:text-white"
                        >
                            Limpiar filtros
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
