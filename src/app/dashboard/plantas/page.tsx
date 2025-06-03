"use client"

import { Plus, Search, Filter, Leaf } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

const plantas = [
    {
        id: 1,
        nombre_cientifico: "Solanum lycopersicum",
        nombre_comun: "Tomate Cherry",
        estado: "Sano",
        ubicacion: "Invernadero A",
        fecha_siembra: "2024-01-10",
    },
    {
        id: 2,
        nombre_cientifico: "Lactuca sativa",
        nombre_comun: "Lechuga Romana",
        estado: "Sano",
        ubicacion: "Huerto Principal",
        fecha_siembra: "2024-01-08",
    },
    {
        id: 3,
        nombre_cientifico: "Capsicum annuum",
        nombre_comun: "Pimiento Rojo",
        estado: "Recuperacion",
        ubicacion: "Invernadero B",
        fecha_siembra: "2024-01-05",
    },
    {
        id: 4,
        nombre_cientifico: "Brassica oleracea",
        nombre_comun: "Brócoli",
        estado: "Sano",
        ubicacion: "Huerto Norte",
        fecha_siembra: "2024-01-03",
    },
    {
        id: 5,
        nombre_cientifico: "Daucus carota",
        nombre_comun: "Zanahoria",
        estado: "Enfermo",
        ubicacion: "Huerto Sur",
        fecha_siembra: "2024-01-01",
    },
]

export default function PlantasPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Gestión de Plantas</h1>
                            <p className="text-muted-foreground">Administra y monitorea todos los cultivos de la granja</p>
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
                                Nueva Planta
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Plantas</CardTitle>
                                <Leaf className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">87</div>
                                <p className="text-xs text-muted-foreground">+12 desde la semana pasada</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Plantas Sanas</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">74</div>
                                <p className="text-xs text-muted-foreground">85% del total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">En Recuperación</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">9</div>
                                <p className="text-xs text-muted-foreground">10% del total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Enfermas</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4</div>
                                <p className="text-xs text-muted-foreground">5% del total</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Chart */}
                        <Card className="lg:col-span-4 border-primary/20">
                            <CardHeader>
                                <CardTitle>Distribución de Cultivos</CardTitle>
                                <CardDescription>Cantidad de plantas por tipo de cultivo</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[250px] w-full bg-secondary rounded-md flex items-end gap-2 p-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[150px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Tomates</span>
                                        <span className="text-xs font-bold">25</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[120px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Lechugas</span>
                                        <span className="text-xs font-bold">20</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[100px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Pimientos</span>
                                        <span className="text-xs font-bold">15</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[80px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Brócoli</span>
                                        <span className="text-xs font-bold">12</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[90px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Zanahorias</span>
                                        <span className="text-xs font-bold">15</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Estadoo de Salud */}
                        <Card className="lg:col-span-3 border-primary/20">
                            <CardHeader>
                                <CardTitle>Estado de Salud General</CardTitle>
                                <CardDescription>Condición actual de los cultivos</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Sanas</span>
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
                                            <span className="text-sm font-medium">Enfermas</span>
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
                                                <span className="text-sm">Fungicidas</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">6 plantas</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                                <span className="text-sm">Pesticidas</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">3 plantas</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabla de Plantas */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Listado Completo de Plantas</CardTitle>
                            <CardDescription>Información detallada de todos los cultivos registrados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Nombre Común</TableHead>
                                            <TableHead>Nombre Científico</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Ubicación</TableHead>
                                            <TableHead>Fecha Siembra</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {plantas.map((planta) => (
                                            <TableRow key={planta.id}>
                                                <TableCell className="font-medium">{planta.id}</TableCell>
                                                <TableCell>{planta.nombre_comun}</TableCell>
                                                <TableCell className="italic">{planta.nombre_cientifico}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            planta.estado === "Sano"
                                                                ? "bg-primary"
                                                                : planta.estado === "Recuperacion"
                                                                    ? "bg-amber-500"
                                                                    : "bg-red-500"
                                                        }
                                                    >
                                                        {planta.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{planta.ubicacion}</TableCell>
                                                <TableCell>{new Date(planta.fecha_siembra).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
