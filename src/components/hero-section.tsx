"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
    return (
        <section
            className="relative bg-cover bg-center bg-gray-900 text-white py-24"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/placeholder.svg?height=600&width=1200)",
            }}
        >
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Productos Naturales de la Granja</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Cultivamos con amor y respeto por la naturaleza para ofrecerte los mejores productos orgánicos
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/productos">
                        <Button size="lg" className="btn-primary">
                            Ver Productos
                        </Button>
                    </Link>
                    <Link href="/nosotros">
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                            Conoce Nuestra Historia
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
