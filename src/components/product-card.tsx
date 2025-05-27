"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface Product {
    id: number
    nombre: string
    precio: string
    imagen: string
    unidad: string
    categoria: string
}

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()
    const { toast } = useToast()

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            quantity: 1,
            imagen: product.imagen,
        })

        toast({
            title: "Producto añadido",
            description: `${product.nombre} añadido al carrito.`,
        })
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="relative">
                <Image
                    src={product.imagen || "/placeholder.svg"}
                    alt={product.nombre}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                />
                {product.precio < 10000 && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm">Oferta</span>
                )}
            </div>
            <div className="p-4">
                <h4 className="font-bold text-lg mb-2">{product.nombre}</h4>
                <p className="text-gray-600 text-sm mb-2">{product.unidad}</p>
                <div className="flex justify-between items-center">
                    <span className="text-[#5d8c47] font-bold text-xl">${product.precio.toLocaleString()}</span>
                    <Button size="sm" onClick={handleAddToCart} className="btn-primary">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Añadir
                    </Button>
                </div>
            </div>
        </div>
    )
}
