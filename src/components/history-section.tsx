import { Users, Award, Leaf, Heart } from "lucide-react"

export function HistorySection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="section-title">Nuestros Comienzos</h2>
                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg">
                                En 1985, Don Carlos Mendoza fundó Granja Los Prados con una visión simple pero poderosa: cultivar
                                alimentos sanos y nutritivos respetando la naturaleza y las tradiciones agrícolas de nuestros ancestros.
                            </p>
                            <p className="text-gray-600 text-lg">
                                Lo que comenzó como una pequeña parcela familiar se ha convertido en una granja próspera que abastece a
                                cientos de familias con productos orgánicos certificados, manteniendo siempre nuestros valores
                                fundamentales.
                            </p>
                            <p className="text-gray-600 text-lg">
                                Hoy, bajo la dirección de la tercera generación, continuamos innovando en técnicas de agricultura
                                sostenible mientras preservamos las tradiciones que nos han llevado hasta aquí.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            src="/placeholder.svg?height=500&width=600"
                            alt="Historia de Granja Los Prados"
                            className="rounded-lg shadow-lg w-full"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-[#5d8c47] text-white p-6 rounded-lg shadow-lg">
                            <div className="text-center">
                                <div className="text-2xl font-bold">39+</div>
                                <p className="text-green-100">Años de experiencia</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <Users className="h-12 w-12 text-[#5d8c47] mx-auto mb-4" />
                        <div className="text-2xl font-bold text-gray-800 mb-2">500+</div>
                        <p className="text-gray-600">Familias atendidas</p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <Leaf className="h-12 w-12 text-[#5d8c47] mx-auto mb-4" />
                        <div className="text-2xl font-bold text-gray-800 mb-2">50+</div>
                        <p className="text-gray-600">Productos orgánicos</p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <Award className="h-12 w-12 text-[#5d8c47] mx-auto mb-4" />
                        <div className="text-2xl font-bold text-gray-800 mb-2">5</div>
                        <p className="text-gray-600">Certificaciones</p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <Heart className="h-12 w-12 text-[#5d8c47] mx-auto mb-4" />
                        <div className="text-2xl font-bold text-gray-800 mb-2">100%</div>
                        <p className="text-gray-600">Satisfacción</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
