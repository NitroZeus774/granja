"use client";
import { Shield, Truck, RotateCcw } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            icon: Shield,
            title: "100% Orgánico",
            description: "Productos cultivados sin pesticidas ni químicos dañinos para tu salud.",
        },
        {
            icon: Truck,
            title: "Envío Rápido",
            description: "Recibe tus productos frescos en 24-48 horas después de la cosecha.",
        },
        {
            icon: RotateCcw,
            title: "Satisfacción Garantizada",
            description: "Si no estás satisfecho, te devolvemos tu dinero sin preguntas.",
        },
    ]

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-8 bg-white rounded-lg shadow-lg">
                            <feature.icon className="h-12 w-12 text-[#5d8c47] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
