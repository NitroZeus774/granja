"use client"

import { useEffect, useState } from "react"
import { Calendar, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimalesTable } from "@/components/animales-table"
import { ProductosTable } from "@/components/productos-table"
import { VentasTable } from "@/components/ventas-table"
import { UbicacionesTable } from "@/components/ubicaciones-table"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Leaf, Package } from "lucide-react"

interface DashboardStats {
    totalAnimales: number
    totalPlantas: number
    totalProductos: number
    ventasMensuales: number
    animalesPorEstado: Array<{ estado: string; count: number }>
    plantasPorEstado: Array<{ estado: string; count: number }>
    productosPorEstado: Array<{ estado: string; count: number }>
    ventasPorMetodo: Array<{ metodo_pago: string; count: number }>
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Función helper para formatear números de forma segura
    const formatNumber = (value: number | undefined | null): string => {
        if (value === undefined || value === null || isNaN(Number(value))) {
            return "0"
        }
        return Number(value).toLocaleString("es-MX")
    }

    // Función helper para formatear moneda de forma segura
    const formatCurrency = (value: number | undefined | null): string => {
        if (value === undefined || value === null || isNaN(Number(value))) {
            return "$0.00"
        }
        return `$${Number(value).toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`
    }

    useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch("/api/dashboard/stats")

                if (!response.ok) {
                    throw new Error(`Error al cargar estadísticas: ${response.status}`)
                }

                const data = await response.json()
                setStats(data)
            } catch (error) {
                console.error("Error fetching dashboard stats:", error)
                setError("Error al cargar las estadísticas del dashboard. Por favor, intenta de nuevo más tarde.")
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (error) {
        return (
            <div className="flex min-h-screen bg-secondary">
                <Sidebar />
                <div className="flex-1">
                    <DashboardHeader />
                    <main className="p-4 md:p-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                            <p className="text-gray-700 mb-4">{error}</p>
                            <Button onClick={() => window.location.reload()}>Reintentar</Button>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex min-h-screen bg-secondary">
                <Sidebar />
                <div className="flex-1">
                    <DashboardHeader />
                    <main className="p-4 md:p-6">
                        <div className="text-center py-8">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent mb-4"></div>
                            <div className="text-lg text-muted-foreground">Cargando dashboard...</div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    // Valores seguros para las estadísticas
    const safeStats = {
        totalAnimales: stats?.totalAnimales || 0,
        totalPlantas: stats?.totalPlantas || 0,
        totalProductos: stats?.totalProductos || 0,
        ventasMensuales: stats?.ventasMensuales || 0,
        animalesPorEstado: stats?.animalesPorEstado || [],
        plantasPorEstado: stats?.plantasPorEstado || [],
        productosPorEstado: stats?.productosPorEstado || [],
        ventasPorMetodo: stats?.ventasPorMetodo || [],
    }

    return (
        <div className="flex min-h-screen bg-secondary">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <DashboardHeader />

                {/* Dashboard Content */}
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-accent">Dashboard de Los Prados</h1>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Últimos 30 días
                            </Button>
                            <Button variant="outline" size="sm">
                                <Bell className="mr-2 h-4 w-4" />
                                Notificaciones
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
                                <div className="text-2xl font-bold">{formatNumber(safeStats.totalAnimales)}</div>
                                <p className="text-xs text-muted-foreground">Animales registrados</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Plantas</CardTitle>
                                <Leaf className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatNumber(safeStats.totalPlantas)}</div>
                                <p className="text-xs text-muted-foreground">Plantas registradas</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Productos Disponibles</CardTitle>
                                <Package className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatNumber(safeStats.totalProductos)}</div>
                                <p className="text-xs text-muted-foreground">Productos en inventario</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ventas Mensuales</CardTitle>
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
                                    <circle cx="8" cy="21" r="1" />
                                    <circle cx="19" cy="21" r="1" />
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(safeStats.ventasMensuales)}</div>
                                <p className="text-xs text-muted-foreground">Ingresos del mes</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs Section */}
                    <Tabs defaultValue="animales" className="space-y-4">
                        <TabsList className="bg-secondary border border-primary/20">
                            <TabsTrigger
                                value="animales"
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                Animales
                            </TabsTrigger>
                            <TabsTrigger
                                value="productos"
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                Productos
                            </TabsTrigger>
                            <TabsTrigger
                                value="ventas"
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                Ventas
                            </TabsTrigger>
                            <TabsTrigger
                                value="ubicaciones"
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                Ubicaciones
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="animales" className="space-y-4">
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle>Listado de Animales</CardTitle>
                                    <CardDescription>Información detallada de los animales en la granja</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <AnimalesTable />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="productos" className="space-y-4">
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle>Listado de Productos</CardTitle>
                                    <CardDescription>Productos disponibles para venta</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ProductosTable />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="ventas" className="space-y-4">
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle>Historial de Ventas</CardTitle>
                                    <CardDescription>Últimas transacciones realizadas</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <VentasTable />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="ubicaciones" className="space-y-4">
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle>Listado de Ubicaciones</CardTitle>
                                    <CardDescription>Áreas de producción en la granja</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <UbicacionesTable />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}
