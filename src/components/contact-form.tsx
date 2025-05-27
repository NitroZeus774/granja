"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate form submission
        setTimeout(() => {
            toast({
                title: "Mensaje enviado",
                description: "Gracias por contactarnos. Te responderemos pronto.",
            })
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-[#5d8c47] mb-6">Envíanos un Mensaje</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="subject">Asunto</Label>
                        <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required />
                    </div>
                </div>

                <div>
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required />
                </div>

                <Button type="submit" className="w-full btn-primary" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Mensaje"}
                </Button>
            </form>
        </div>
    )
}
