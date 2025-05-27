"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from 'lucide-react'

export function AboutSection() {
    return (
        <section id="nosotros" className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Nuestra Granja"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="section-title">Sobre Nosotros</h2>
                        <p className="text-gray-600 mb-6">
                            Granja Los Prados fue fundada en 1980 por la familia Martínez con el sueño de producir
                            alimentos saludables mientras se preserva el medio ambiente. Lo que comenzó como una
                            pequeña huerta familiar hoy es una referencia en agricultura sostenible en la región.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Nuestro compromiso con la calidad y la sostenibilidad nos ha permitido crecer manteniendo
                            nuestros valores fundamentales: respeto por la tierra, trato ético a los animales y
                            producción libre de químicos dañinos.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Agricultura sostenible</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Animales criados en libertad</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Productos sin conservantes</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Entrega directa del campo</span>
                            </div>
                        </div>
                        <Link href="/nosotros">
                            <Button className="btn-primary">
                                Conoce Nuestra Historia
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}