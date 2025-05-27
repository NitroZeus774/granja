"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
    })
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate form submission
        setTimeout(() => {
            toast({
                title: "Mensaje enviado",
                description: "Nos pondremos en contacto contigo pronto.",
            })
            setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })
            setLoading(false)
        }, 1000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section id="contacto" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">Contacto</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-6 text-[#5d8c47]">Información de Contacto</h3>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="h-6 w-6 text-[#5d8c47] mt-1" />
                                <div>
                                    <h4 className="font-semibold">Dirección</h4>
                                    <p className="text-gray-600">Vereda El Paraíso, Km 12<br />Municipio, Departamento</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="h-6 w-6 text-[#5d8c47] mt-1" />
                                <div>
                                    <h4 className="font-semibold">Teléfonos</h4>
                                    <p className="text-gray-600">+57 300 123 4567<br />+57 601 234 5678</p>
                                    <p className="text-sm text-gray-500">Lunes a Viernes: 8am - 5pm</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="h-6 w-6 text-[#5d8c47] mt-1" />
                                <div>
                                    <h4 className="font-semibold">Correos Electrónicos</h4>
                                    <p className="text-gray-600">info@granjalosprados.com<br />ventas@granjalosprados.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Clock className="h-6 w-6 text-[#5d8c47] mt-1" />
                                <div>
                                    <h4 className="font-semibold">Horario de Atención</h4>
                                    <p className="text-gray-600">Lunes a Viernes: 8:00 am - 5:00 pm<br />Sábados: 8:00 am - 12:00 pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-6 text-[#5d8c47]">Envíanos un Mensaje</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="nombre">Nombre completo *</Label>
                                    <Input
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Correo electrónico *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="asunto">Asunto</Label>
                                <Input
                                    id="asunto"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="mensaje">Mensaje *</Label>
                                <Textarea
                                    id="mensaje"
                                    name="mensaje"
                                    rows={5}
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? "Enviando..." : "Enviar Mensaje"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}