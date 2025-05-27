import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react"

export function ContactInfo() {
    return (
        <div className="bg-[#5d8c47] text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 mt-1 text-green-200" />
                    <div>
                        <h4 className="font-semibold mb-1">Teléfono</h4>
                        <p className="text-green-100">+57 300 123 4567</p>
                        <p className="text-green-100">+57 301 987 6543</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 mt-1 text-green-200" />
                    <div>
                        <h4 className="font-semibold mb-1">Correo Electrónico</h4>
                        <p className="text-green-100">info@granjalosprados.com</p>
                        <p className="text-green-100">ventas@granjalosprados.com</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 mt-1 text-green-200" />
                    <div>
                        <h4 className="font-semibold mb-1">Dirección</h4>
                        <p className="text-green-100">Vereda El Paraíso, Km 12</p>
                        <p className="text-green-100">Municipio de Ejemplo</p>
                        <p className="text-green-100">Colombia</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 mt-1 text-green-200" />
                    <div>
                        <h4 className="font-semibold mb-1">Horarios de Atención</h4>
                        <p className="text-green-100">Lunes a Viernes: 7:00 AM - 5:00 PM</p>
                        <p className="text-green-100">Sábados: 7:00 AM - 2:00 PM</p>
                        <p className="text-green-100">Domingos: Cerrado</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-green-400">
                <h4 className="font-semibold mb-4">Síguenos en Redes Sociales</h4>
                <div className="flex gap-4">
                    <a href="#" className="text-green-200 hover:text-white transition-colors">
                        <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-green-200 hover:text-white transition-colors">
                        <Instagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-green-200 hover:text-white transition-colors">
                        <Twitter className="h-6 w-6" />
                    </a>
                </div>
            </div>
        </div>
    )
}
