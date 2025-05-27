"use client";
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail } from "lucide-react"

export function NewsletterSection() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate newsletter subscription
        setTimeout(() => {
            toast({
                title: "¡Suscripción exitosa!",
                description: "Te mantendremos informado sobre nuestros productos y ofertas.",
            })
            setEmail("")
            setLoading(false)
        }, 1000)
    }

    return (
        <section className="py-16 bg-[#5d8c47] text-white">
            <div className="container mx-auto px-4 text-center">
                <Mail className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Mantente Informado</h2>
                <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                    Suscríbete a nuestro boletín y recibe las últimas noticias sobre productos frescos, ofertas especiales y
                    consejos de agricultura sostenible.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
                    <Input
                        type="email"
                        placeholder="Tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-white text-gray-900"
                    />
                    <Button type="submit" disabled={loading} className="bg-[#8b5a2b] hover:bg-[#7a4d24] text-white">
                        {loading ? "Suscribiendo..." : "Suscribirse"}
                    </Button>
                </form>

                <p className="text-green-200 text-sm mt-4">
                    No compartimos tu información. Puedes cancelar tu suscripción en cualquier momento.
                </p>
            </div>
        </section>
    )
}
