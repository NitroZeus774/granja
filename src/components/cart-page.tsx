"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartPage() {
    const { items = [], updateQuantity, removeItem, total = 0, clearCart } = useCart()

    // Función helper para formatear precios de forma segura
    const formatPrice = (price: number | undefined | null): string => {
        const safePrice = price ?? 0
        return safePrice.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-600 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-8">Agrega algunos productos para comenzar tu compra</p>
                <Link href="/productos">
                    <Button className="btn-primary">Ver Productos</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#5d8c47] mb-8">Carrito de Compras</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                                    <Image
                                        src={item.imagen || "/placeholder.svg?height=80&width=80"}
                                        alt={item.nombre || "Producto"}
                                        width={80}
                                        height={80}
                                        className="rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{item.nombre || "Producto sin nombre"}</h3>
                                        <p className="text-[#5d8c47] font-bold">${formatPrice(item.precio)}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity?.(item.id, Math.max(0, (item.cantidad ?? 1) - 1))}
                                            disabled={!updateQuantity}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-12 text-center font-semibold">{item.cantidad ?? 0}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity?.(item.id, (item.cantidad ?? 0) + 1)}
                                            disabled={!updateQuantity}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-lg">${formatPrice((item.precio ?? 0) * (item.cantidad ?? 0))}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeItem?.(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                            disabled={!removeItem}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t">
                            <Button
                                variant="outline"
                                onClick={clearCart}
                                className="text-red-500 border-red-500 hover:bg-red-50"
                                disabled={!clearCart}
                            >
                                Vaciar Carrito
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envío:</span>
                                <span>Gratis</span>
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span className="text-[#5d8c47]">${formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full btn-primary mb-4">Proceder al Pago</Button>

                        <Link href="/productos">
                            <Button variant="outline" className="w-full">
                                Continuar Comprando
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
