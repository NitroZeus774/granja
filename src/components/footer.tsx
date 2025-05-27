"use client";
import Link from "next/link"
import { TreePine, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#4a7a3a] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <TreePine className="h-6 w-6" />
                            <h5 className="text-xl font-bold">Granja Los Prados</h5>
                        </div>
                        <p className="text-green-100">Agricultura sostenible y productos naturales desde 1985.</p>
                    </div>

                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-green-200">Enlaces rápidos</h5>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-green-100 hover:text-white transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/productos" className="text-green-100 hover:text-white transition-colors">
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link href="/nosotros" className="text-green-100 hover:text-white transition-colors">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="text-green-100 hover:text-white transition-colors">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-green-200">Legal</h5>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terminos" className="text-green-100 hover:text-white transition-colors">
                                    Términos y condiciones
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacidad" className="text-green-100 hover:text-white transition-colors">
                                    Política de privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-8 border-green-300" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-green-100 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Granja Los Prados. Todos los derechos reservados.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-green-200 hover:text-white transition-colors">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-green-200 hover:text-white transition-colors">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-green-200 hover:text-white transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
