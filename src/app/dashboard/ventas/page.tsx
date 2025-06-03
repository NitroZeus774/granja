"use client"

import { Plus, Search, Filter, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VentasTable } from "@/components/ventas-table"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function VentasPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Gestión de Ventas</h1>
                            <p className="text-muted-foreground">Administra las transacciones y ventas realizadas</p>
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
                                Nueva Venta
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$12,450</div>
                                <p className="text-xs text-muted-foreground">+18% desde el mes pasado</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">156</div>
                                <p className="text-xs text-muted-foreground">+12 desde ayer</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$79.80</div>
                                <p className="text-xs text-muted-foreground">+5% desde la semana pasada</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">42</div>
                                <p className="text-xs text-muted-foreground">+3 nuevos este mes</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Chart */}
                        <Card className="lg:col-span-4 border-primary/20">
                            <CardHeader>
                                <CardTitle>Ventas Mensuales</CardTitle>
                                <CardDescription>Ingresos de los últimos 6 meses</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[250px] w-full bg-secondary rounded-md flex items-end gap-2 p-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[100px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Enero</span>
                                        <span className="text-xs font-bold">$8,450</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[120px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Febrero</span>
                                        <span className="text-xs font-bold">$9,200</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[90px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Marzo</span>
                                        <span className="text-xs font-bold">$7,800</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[140px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Abril</span>
                                        <span className="text-xs font-bold">$10,500</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[160px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Mayo</span>
                                        <span className="text-xs font-bold">$11,200</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-[180px] w-12 bg-primary rounded-sm" />
                                        <span className="text-xs">Junio</span>
                                        <span className="text-xs font-bold">$12,450</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Métodos de Pago */}
                        <Card className="lg:col-span-3 border-primary/20">
                            <CardHeader>
                                <CardTitle>Métodos de Pago</CardTitle>
                                <CardDescription>Distribución de ventas por método</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Efectivo</span>
                                            <span className="text-sm font-medium">45%</span>
                                        </div>
                                        <Progress value={45} className="h-2 bg-secondary" indicatorClassName="bg-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Tarjeta</span>
                                            <span className="text-sm font-medium">35%</span>
                                        </div>
                                        <Progress value={35} className="h-2 bg-secondary" indicatorClassName="bg-accent" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Transferencia</span>
                                            <span className="text-sm font-medium">20%</span>
                                        </div>
                                        <Progress value={20} className="h-2 bg-secondary" indicatorClassName="bg-amber-500" />
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Clientes Principales</h4>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback>RM</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">Restaurante Montaña</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">$2,450</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback>MO</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">Mercado Orgánico</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">$1,850</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabla de Ventas */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Historial de Ventas</CardTitle>
                            <CardDescription>Registro completo de todas las transacciones</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <VentasTable />
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
