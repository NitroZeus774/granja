"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, LogOut, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { items } = useCart()
    const { user, logout } = useAuth()

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2 text-[#5d8c47] font-bold text-xl">
                        <TreePine className="h-6 w-6" />
                        <span>Granja Los Prados</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-[#5d8c47] transition-colors">
                            Inicio
                        </Link>
                        <Link href="/productos" className="text-gray-700 hover:text-[#5d8c47] transition-colors">
                            Productos
                        </Link>
                        <Link href="/nosotros" className="text-gray-700 hover:text-[#5d8c47] transition-colors">
                            Sobre Nosotros
                        </Link>
                        <Link href="/contacto" className="text-gray-700 hover:text-[#5d8c47] transition-colors">
                            Contacto
                        </Link>
                    </div>

                    {/* Auth & Cart */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link href="/carrito" className="relative">
                                    <Button variant="outline" size="sm">
                                        <ShoppingCart className="h-4 w-4" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" onClick={logout}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Salir
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline" size="sm">
                                        <User className="h-4 w-4 mr-2" />
                                        Iniciar Sesión
                                    </Button>
                                </Link>
                                <Link href="/registro">
                                    <Button size="sm" className="btn-primary">
                                        Registrarse
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-700 hover:text-[#5d8c47]">
                                Inicio
                            </Link>
                            <Link href="/productos" className="text-gray-700 hover:text-[#5d8c47]">
                                Productos
                            </Link>
                            <Link href="/nosotros" className="text-gray-700 hover:text-[#5d8c47]">
                                Sobre Nosotros
                            </Link>
                            <Link href="/contacto" className="text-gray-700 hover:text-[#5d8c47]">
                                Contacto
                            </Link>
                            {user ? (
                                <>
                                    <Link href="/carrito" className="text-gray-700 hover:text-[#5d8c47]">
                                        Carrito ({cartCount})
                                    </Link>
                                    <button onClick={logout} className="text-left text-gray-700 hover:text-[#5d8c47]">
                                        Salir
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-700 hover:text-[#5d8c47]">
                                        Iniciar Sesión
                                    </Link>
                                    <Link href="/registro" className="text-gray-700 hover:text-[#5d8c47]">
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
