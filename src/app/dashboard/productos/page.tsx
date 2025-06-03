"use client"

import { Plus, Search, Filter, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ProductosTable } from "@/components/productos-table"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ProductosPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Gestión de Productos</h1>
                            <p className="text-muted-foreground">Administra el inventario y productos disponibles</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Search className="mr-2 h-4 w-4" />
                                Buscar
                            </Button>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filtrar
                            </Button>
                            <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Nuevo Producto
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                                <Package className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">36</div>
                                <p className="text-xs text-muted-foreground">+3 desde la semana pasada</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">27</div>
                                <p className="text-xs text-muted-foreground">75% del inventario</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Reservados</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">7</div>
                                <p className="text-xs text-muted-foreground">20% del inventario</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$8,450</div>
                                <p className="text-xs text-muted-foreground">Inventario actual</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Chart */}
                        <Card className="lg:col-span-4 border-primary/20">
                            <CardHeader>
                                <CardTitle>Productos por Categoría</CardTitle>
                                <CardDescription>Distribución del inventario por tipo</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[250px] w-full bg-secondary rounded-md flex items-end gap-2 p-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[150px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Lácteos</span>
                                        <span className="text-xs font-bold">12</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[100px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Carnes</span>
                                        <span className="text-xs font-bold">8</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[80px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Huevos</span>
                                        <span className="text-xs font-bold">6</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[120px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Vegetales</span>
                                        <span className="text-xs font-bold">10</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Estado de Productos */}
                        <Card className="lg:col-span-3 border-primary/20">
                            <CardHeader>
                                <CardTitle>Estado del Inventario</CardTitle>
                                <CardDescription>Disponibilidad actual</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Disponibles</span>
                                            <span className="text-sm font-medium">75%</span>
                                        </div>
                                        <Progress value={75} className="h-2 bg-secondary" indicatorClassName="bg-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Reservados</span>
                                            <span className="text-sm font-medium">20%</span>
                                        </div>
                                        <Progress value={20} className="h-2 bg-secondary" indicatorClassName="bg-amber-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">No Disponibles</span>
                                            <span className="text-sm font-medium">5%</span>
                                        </div>
                                        <Progress value={5} className="h-2 bg-secondary" indicatorClassName="bg-red-500" />
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Productos Más Vendidos</h4>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <span className="text-sm">Leche Fresca</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">120 unidades</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <span className="text-sm">Huevos Orgánicos</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">95 docenas</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Inventario Completo</CardTitle>
                            <CardDescription>Lista detallada de todos los productos disponibles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProductosTable />
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
