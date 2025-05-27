import Image from "next/image"

export function TeamSection() {
    const teamMembers = [
        {
            name: "Jainer Morales",
            position: "Fundador",
            description: "Con más de 40 años de experiencia en agricultura sostenible.",
            image: "/placeholder.svg?height=250&width=250"
        },
        {
            name: "Alex Palacios",
            position: "Gerente de Operaciones",
            description: "Encargado de logística y distribución de productos.",
            image: "/placeholder.svg?height=250&width=250"
        },
        {
            name: "Laura Blandon",
            position: "Directora Agrícola",
            description: "Especialista en cultivos orgánicos y permacultura.",
            image: "/placeholder.svg?height=250&width=250"
        },
        {
            name: "Deiner Bello",
            position: "Responsable de Calidad",
            description: "Supervisa todos nuestros procesos productivos.",
            image: "/placeholder.svg?height=250&width=250"
        }
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">Conoce Nuestro Equipo</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                            <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                width={250}
                                height={250}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                                <p className="text-gray-600 mb-3">{member.position}</p>
                                <p className="text-sm text-gray-500">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}