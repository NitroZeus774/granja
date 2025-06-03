"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

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

interface ProductCardProps {
    product: Product
}

// Función helper para formatear precios de forma segura
const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return "0.00"
    const numPrice = Number(price)
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2)
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        if (addItem) {
            addItem({
                id: product.id,
                name: product.nombre,
                price: Number(product.precio) || 0,
                quantity: 1,
                image: product.imagen || "/placeholder.svg?height=300&width=300",
            })
        }
    }

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={product.imagen || "/placeholder.svg?height=300&width=300"}
                    alt={product.nombre}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.categoria && <Badge className="absolute top-2 left-2 bg-[#5d8c47]">{product.categoria}</Badge>}
            </div>

            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.nombre}</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-[#5d8c47]">${formatPrice(product.precio)}</span>
                    <span className="text-sm text-gray-600">por {product.unidad}</span>
                </div>
                {product.cantidad !== undefined && (
                    <p className="text-sm text-gray-600">
                        Disponible: {product.cantidad} {product.unidad}
                    </p>
                )}
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={handleAddToCart}
                    className="w-full bg-[#5d8c47] hover:bg-[#4a7038] text-white"
                    disabled={product.estado !== "Disponible" || (product.cantidad && product.cantidad <= 0)}
                >
                    {product.estado === "Disponible" && product.cantidad && product.cantidad > 0
                        ? "Agregar al Carrito"
                        : "No Disponible"}
                </Button>
            </CardFooter>
        </Card>
    )
}
