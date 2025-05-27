"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductsFilterProps {
    selectedCategory?: string
}

export function ProductsFilter({ selectedCategory }: ProductsFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const categories = [
        { value: "todos", label: "Todas las categorías" },
        { value: "verduras", label: "Verduras" },
        { value: "lácteos", label: "Lácteos" },
        { value: "endulzantes", label: "Endulzantes" },
        { value: "conservas", label: "Conservas" },
    ]

    const sortOptions = [
        { value: "default", label: "Ordenar por" },
        { value: "nombre", label: "Nombre A-Z" },
        { value: "precio-asc", label: "Precio: Menor a Mayor" },
        { value: "precio-desc", label: "Precio: Mayor a Menor" },
    ]

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (category === "todos") {
            params.delete("categoria")
        } else {
            params.set("categoria", category)
        }
        router.push(`/productos?${params.toString()}`)
    }

    const handleSortChange = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (sort === "default" || !sort) {
            params.delete("orden")
        } else {
            params.set("orden", sort)
        }
        router.push(`/productos?${params.toString()}`)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-[#5d8c47]">Filtros</h3>

            <div className="space-y-6">
                {/* Categories */}
                <div>
                    <h4 className="font-medium mb-3">Categorías</h4>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <Button
                                key={category.value}
                                variant={
                                    selectedCategory === category.value || (!selectedCategory && category.value === "todos")
                                        ? "default"
                                        : "ghost"
                                }
                                className={`w-full justify-start ${selectedCategory === category.value || (!selectedCategory && category.value === "todos")
                                        ? "btn-primary"
                                        : "text-gray-600 hover:text-[#5d8c47]"
                                    }`}
                                onClick={() => handleCategoryChange(category.value)}
                            >
                                {category.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div>
                    <h4 className="font-medium mb-3">Ordenar</h4>
                    <Select onValueChange={handleSortChange} defaultValue={searchParams.get("orden") || "default"}>
                        <SelectTrigger>
                            <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="font-medium mb-3">Rango de Precio</h4>
                    <div className="space-y-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:text-[#5d8c47]"
                            onClick={() => handleSortChange("precio-asc")}
                        >
                            Menos de $10,000
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:text-[#5d8c47]"
                            onClick={() => handleSortChange("precio-desc")}
                        >
                            $10,000 - $20,000
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 hover:text-[#5d8c47]"
                            onClick={() => handleSortChange("precio-desc")}
                        >
                            Más de $20,000
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
