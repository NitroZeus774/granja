"use client"

import { Plus, Search, Filter, PiggyBank } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

const gastos = [
    {
        id: 1,
        tipo_gasto: "Alimentación Animal",
        monto: 450.0,
        fecha: "2024-01-15",
        categoria: "Operativo",
    },
    {
        id: 2,
        tipo_gasto: "Medicamentos Veterinarios",
        monto: 280.0,
        fecha: "2024-01-14",
        categoria: "Salud",
    },
    {
        id: 3,
        tipo_gasto: "Mantenimiento Equipos",
        monto: 320.0,
        fecha: "2024-01-13",
        categoria: "Mantenimiento",
    },
    {
        id: 4,
        tipo_gasto: "Combustible",
        monto: 150.0,
        fecha: "2024-01-12",
        categoria: "Operativo",
    },
    {
        id: 5,
        tipo_gasto: "Semillas y Fertilizantes",
        monto: 380.0,
        fecha: "2024-01-11",
        categoria: "Agricultura",
    },
]

export default function GastosPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Gestión de Gastos</h1>
                            <p className="text-muted-foreground">Controla y registra todos los gastos de la granja</p>
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
                                Nuevo Gasto
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
                                <PiggyBank className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$3,450</div>
                                <p className="text-xs text-muted-foreground">-8% desde el mes pasado</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Gastos Operativos</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$1,850</div>
                                <p className="text-xs text-muted-foreground">54% del total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Gastos de Salud</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$680</div>
                                <p className="text-xs text-muted-foreground">20% del total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Mantenimiento</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$920</div>
                                <p className="text-xs text-muted-foreground">26% del total</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Chart */}
                        <Card className="lg:col-span-4 border-primary/20">
                            <CardHeader>
                                <CardTitle>Gastos por Categoría</CardTitle>
                                <CardDescription>Distribución de gastos mensuales</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[250px] w-full bg-secondary rounded-md flex items-end gap-2 p-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[150px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Operativo</span>
                                        <span className="text-xs font-bold">$1,850</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[100px] w-12 bg-accent rounded-sm" />
                                        <span className="text-xs">Salud</span>
                                        <span className="text-xs font-bold">$680</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[120px] w-12 bg-amber-500 rounded-sm" />
                                        <span className="text-xs">Mantenimiento</span>
                                        <span className="text-xs font-bold">$920</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Resumen de Gastos */}
                        <Card className="lg:col-span-3 border-primary/20">
                            <CardHeader>
                                <CardTitle>Resumen Mensual</CardTitle>
                                <CardDescription>Comparación con meses anteriores</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Enero 2024</span>
                                        <span className="text-sm font-bold">$3,450</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Diciembre 2023</span>
                                        <span className="text-sm text-muted-foreground">$3,750</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Noviembre 2023</span>
                                        <span className="text-sm text-muted-foreground">$3,200</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Promedio Trimestral</span>
                                        <span className="text-sm text-muted-foreground">$3,467</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabla de Gastos */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Registro de Gastos</CardTitle>
                            <CardDescription>Historial detallado de todos los gastos registrados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Tipo de Gasto</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Categoría</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {gastos.map((gasto) => (
                                            <TableRow key={gasto.id}>
                                                <TableCell className="font-medium">{gasto.id}</TableCell>
                                                <TableCell>{gasto.tipo_gasto}</TableCell>
                                                <TableCell>${gasto.monto.toFixed(2)}</TableCell>
                                                <TableCell>{new Date(gasto.fecha).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            gasto.categoria === "Operativo"
                                                                ? "bg-primary"
                                                                : gasto.categoria === "Salud"
                                                                    ? "bg-accent"
                                                                    : gasto.categoria === "Mantenimiento"
                                                                        ? "bg-amber-500"
                                                                        : "bg-blue-500"
                                                        }
                                                    >
                                                        {gasto.categoria}
                                                    </Badge>
                                                </TableCell>
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
