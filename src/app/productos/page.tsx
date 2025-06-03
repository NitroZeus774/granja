"use client"

import { ProductsGrid } from "@/components/products-grid"
import { ProductsFilter } from "@/components/products-filter"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { useState } from "react"

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("todos")
    const [selectedSort, setSelectedSort] = useState<string>("default")

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const handleSortChange = (sort: string) => {
        setSelectedSort(sort)
    }

    return (
        <>
            <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-[#5d8c47] mb-8">Nuestros Productos</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <ProductsFilter
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                                onSortChange={handleSortChange}
                            />
                        </div>
                        <div className="lg:col-span-3">
                            <ProductsGrid
                                categoria={selectedCategory === "todos" ? undefined : selectedCategory}
                                orden={selectedSort === "default" ? undefined : selectedSort}
                            />
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}
