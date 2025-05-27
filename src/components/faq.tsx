"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(0)

    const faqs = [
        {
            question: "¿Cómo puedo realizar un pedido?",
            answer: "Puedes realizar tus pedidos directamente a través de nuestra página web en la sección de Productos, o contactándonos por teléfono o WhatsApp durante nuestro horario de atención."
        },
        {
            question: "¿Cuáles son los métodos de pago disponibles?",
            answer: "Aceptamos pagos en efectivo, transferencias bancarias y tarjetas de crédito/débito a través de nuestra plataforma segura de pagos en línea."
        },
        {
            question: "¿Realizan envíos a domicilio?",
            answer: "Sí, realizamos envíos a domicilio en nuestra área de cobertura. Los costos y tiempos de entrega varían según la ubicación. Contáctanos para más detalles."
        }
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">Preguntas Frecuentes</h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                <h3 className="font-semibold">{faq.question}</h3>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-[#5d8c47]" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-[#5d8c47]" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}