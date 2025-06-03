"use client"

import { Plus, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AnimalesTable } from "@/components/animales-table"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AnimalesPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Gestión de Animales</h1>
                            <p className="text-muted-foreground">Administra y monitorea todos los animales de la granja</p>
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
                                Nuevo Animal
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Animales</CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-primary"
                                >
                                    <path d="M15 9.4a4 4 0 1 0 0 5.2" />
                                    <path d="M13 7h2a3 3 0 0 0 0-6h-1a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2h-2a3 3 0 0 0 0 6h1a2 2 0 0 0 2-2v-4" />
                                    <path d="M13 22H9a2 2 0 0 1-2-2v-5" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">124</div>
                                <p className="text-xs text-muted-foreground">+4 desde la semana pasada</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Animales Sanos</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">105</div>
                                <p className="text-xs text-muted-foreground">85% del total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">En Tratamiento</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">10% del total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Enfermos</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">7</div>
                                <p className="text-xs text-muted-foreground">5% del total</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Chart */}
                        <Card className="lg:col-span-4 border-primary/20">
                            <CardHeader>
                                <CardTitle>Distribución de Animales por Tipo</CardTitle>
                                <CardDescription>Cantidad de animales por especie</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[250px] w-full bg-secondary rounded-md flex items-end gap-2 p-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[180px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Vacas</span>
                                        <span className="text-xs font-bold">45</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[120px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Cerdos</span>
                                        <span className="text-xs font-bold">32</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[80px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Toros</span>
                                        <span className="text-xs font-bold">18</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[200px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Gallinas</span>
                                        <span className="text-xs font-bold">52</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[60px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Peces</span>
                                        <span className="text-xs font-bold">12</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Estado de Salud */}
                        <Card className="lg:col-span-3 border-primary/20">
                            <CardHeader>
                                <CardTitle>Estado de Salud General</CardTitle>
                                <CardDescription>Condición actual de los animales</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Sanos</span>
                                            <span className="text-sm font-medium">85%</span>
                                        </div>
                                        <Progress value={85} className="h-2 bg-secondary" indicatorClassName="bg-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">En Recuperación</span>
                                            <span className="text-sm font-medium">10%</span>
                                        </div>
                                        <Progress value={10} className="h-2 bg-secondary" indicatorClassName="bg-amber-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Enfermos</span>
                                            <span className="text-sm font-medium">5%</span>
                                        </div>
                                        <Progress value={5} className="h-2 bg-secondary" indicatorClassName="bg-red-500" />
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Tratamientos Activos</h4>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                                <span className="text-sm">Vacunación</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">8 animales</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                                <span className="text-sm">Antibióticos</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">4 animales</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabla de Animales */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Listado Completo de Animales</CardTitle>
                            <CardDescription>Información detallada de todos los animales registrados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AnimalesTable />
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
