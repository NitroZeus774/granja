export function Timeline() {
    const timelineEvents = [
        {
            year: "1980",
            title: "Fundación",
            description: "La familia Martínez adquiere las primeras 10 hectáreas y comienza con cultivos básicos para consumo local."
        },
        {
            year: "1992",
            title: "Primera Certificación Orgánica",
            description: "Obtenemos nuestra primera certificación como productores orgánicos, siendo pioneros en la región."
        },
        {
            year: "2005",
            title: "Expansión a Mercados Locales",
            description: "Iniciamos la venta directa al público en mercados locales y ferias orgánicas."
        },
        {
            year: "2015",
            title: "Tienda Online",
            description: "Lanzamos nuestra plataforma de ventas online para llegar a más clientes."
        },
        {
            year: "2023",
            title: "Nuevas Instalaciones",
            description: "Inauguramos nuestro centro de procesamiento y empaque con tecnología sostenible."
        }
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">Nuestra Evolución</h2>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#5d8c47]"></div>

                    <div className="space-y-8">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="relative flex items-start">
                                <div className="absolute left-6 w-4 h-4 bg-[#8b5a2b] border-4 border-[#5d8c47] rounded-full"></div>
                                <div className="ml-16">
                                    <div className="font-bold text-[#5d8c47] text-lg">{event.year}</div>
                                    <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                                    <p className="text-gray-600">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}