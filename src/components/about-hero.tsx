export function AboutHero() {
    return (
        <section
            className="relative bg-cover bg-center bg-gray-900 text-white py-24"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/placeholder.svg?height=500&width=1200)",
            }}
        >
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestra Historia</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Tres generaciones dedicadas a la agricultura sostenible y la producción de alimentos orgánicos de calidad
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-300 mb-2">1985</div>
                        <p className="text-green-100">Año de fundación</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-300 mb-2">3</div>
                        <p className="text-green-100">Generaciones</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-300 mb-2">100%</div>
                        <p className="text-green-100">Orgánico</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
