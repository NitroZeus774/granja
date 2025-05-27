import { TreePine, Heart, Users } from 'lucide-react'

export function ValuesSection() {
    const values = [
        {
            icon: TreePine,
            title: "Sostenibilidad",
            description: "Practicamos una agricultura que protege los recursos naturales para las futuras generaciones."
        },
        {
            icon: Heart,
            title: "Calidad",
            description: "Cada producto lleva nuestro compromiso de excelencia y cuidado en su producción."
        },
        {
            icon: Users,
            title: "Comunidad",
            description: "Trabajamos en armonía con nuestra comunidad y el ecosistema que nos rodea."
        }
    ]

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">Nuestros Valores</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="text-center p-8">
                            <value.icon className="h-16 w-16 text-[#5d8c47] mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}