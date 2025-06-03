"use client"

import { Plus, Search, Filter, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UbicacionesTable } from "@/components/ubicaciones-table"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function UbicacionesPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Gestión de Ubicaciones</h1>
                            <p className="text-muted-foreground">Administra las áreas y espacios de producción</p>
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
                                Nueva Ubicación
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Ubicaciones</CardTitle>
                                <MapPin className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">8</div>
                                <p className="text-xs text-muted-foreground">Áreas de producción</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Capacidad Total</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">270</div>
                                <p className="text-xs text-muted-foreground">Espacios disponibles</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ocupación</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">187</div>
                                <p className="text-xs text-muted-foreground">69% de ocupación</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tipos de Producción</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground">Categorías activas</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Chart */}
                        <Card className="lg:col-span-4 border-primary/20">
                            <CardHeader>
                                <CardTitle>Capacidad por Ubicación</CardTitle>
                                <CardDescription>Distribución de capacidad utilizada</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[250px] w-full bg-secondary rounded-md flex items-end gap-2 p-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[180px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Establo</span>
                                        <span className="text-xs font-bold">90%</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[140px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Corral</span>
                                        <span className="text-xs font-bold">70%</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[100px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Huerto</span>
                                        <span className="text-xs font-bold">50%</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[160px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Gallinero</span>
                                        <span className="text-xs font-bold">80%</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[120px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Estanque</span>
                                        <span className="text-xs font-bold">60%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tipo de Producción */}
                        <Card className="lg:col-span-3 border-primary/20">
                            <CardHeader>
                                <CardTitle>Tipos de Producción</CardTitle>
                                <CardDescription>Por ubicación</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-primary" />
                                            <span className="text-sm font-medium">Lácteos</span>
                                        </div>
                                        <Badge variant="outline">Establo</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-accent" />
                                            <span className="text-sm font-medium">Cárnicos</span>
                                        </div>
                                        <Badge variant="outline">Corral</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-amber-500" />
                                            <span className="text-sm font-medium">Vegetales</span>
                                        </div>
                                        <Badge variant="outline">Huerto</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-blue-500" />
                                            <span className="text-sm font-medium">Huevos</span>
                                        </div>
                                        <Badge variant="outline">Gallinero</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-cyan-500" />
                                            <span className="text-sm font-medium">Pescado</span>
                                        </div>
                                        <Badge variant="outline">Estanque</Badge>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Próximas Expansiones</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Invernadero</span>
                                        <Badge className="bg-primary">Planificado</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabla de Ubicaciones */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Listado de Ubicaciones</CardTitle>
                            <CardDescription>Información detallada de todas las áreas de producción</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UbicacionesTable />
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
