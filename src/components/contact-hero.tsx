export function ContactHero() {
    return (
        <section
            className="relative bg-cover bg-center bg-gray-900 text-white py-24"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/placeholder.svg?height=400&width=1200)",
            }}
        >
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Contáctanos</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta sobre nuestros productos.
                </p>
            </div>
        </section>
    )
}
