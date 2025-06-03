"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

interface ProductsFilterProps {
    selectedCategory?: string
    onCategoryChange: (category: string) => void
    onSortChange: (sort: string) => void
}

export function ProductsFilter({ selectedCategory, onCategoryChange, onSortChange }: ProductsFilterProps) {
    const [categories, setCategories] = useState<{ id: number; nombre: string }[]>([])
    const [currentSort, setCurrentSort] = useState("default")

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categorias")
                const promise = await response.json()
                const categorias: { id: number; nombre: string }[] = promise.categorias
                setCategories([{ id: 0, nombre: "todos" }, ...categorias])
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchCategories()
    }, [])

    const sortOptions = [
        { value: "default", label: "Ordenar por" },
        { value: "nombre", label: "Nombre A-Z" },
        { value: "precio-asc", label: "Precio: Menor a Mayor" },
        { value: "precio-desc", label: "Precio: Mayor a Menor" },
    ]

    const handleCategoryChange = (category: string) => {
        onCategoryChange(category)
    }

    const handleSortChange = (sort: string) => {
        setCurrentSort(sort)
        onSortChange(sort)
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
                                key={category.id}
                                variant={
                                    selectedCategory === category.nombre || (!selectedCategory && category.nombre === "todos")
                                        ? "default"
                                        : "ghost"
                                }
                                className={`w-full justify-start ${selectedCategory === category.nombre || (!selectedCategory && category.nombre === "todos")
                                        ? "btn-primary"
                                        : "text-gray-600 hover:text-[#5d8c47]"
                                    }`}
                                onClick={() => handleCategoryChange(category.nombre)}
                            >
                                {category.nombre.charAt(0).toUpperCase() + category.nombre.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div>
                    <h4 className="font-medium mb-3">Ordenar</h4>
                    <Select onValueChange={handleSortChange} value={currentSort}>
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

                {/* Clear Filters */}
                <div>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            handleCategoryChange("todos")
                            handleSortChange("default")
                        }}
                    >
                        Limpiar Filtros
                    </Button>
                </div>
            </div>
        </div>
    )
}
