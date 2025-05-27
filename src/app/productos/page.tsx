import { ProductsGrid } from "@/components/products-grid"
import { ProductsFilter } from "@/components/products-filter"
import { Suspense } from "react"

interface ProductsPageProps {
    searchParams: { categoria?: string; orden?: string }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <ProductsFilter selectedCategory={searchParams.categoria} />
                </div>
                <div className="lg:col-span-3">
                    <Suspense fallback={<div>Cargando productos...</div>}>
                        <ProductsGrid categoria={searchParams.categoria} orden={searchParams.orden} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
