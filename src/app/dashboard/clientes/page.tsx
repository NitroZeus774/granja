"use client"

import { Plus, Search, Filter, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

const clientes = [
    {
        id: 1,
        nombre: "Restaurante Montaña",
        contacto: "restaurante@montana.com",
        telefono: "+1 234-567-8901",
        fecha_registro: "2023-12-15",
        total_compras: 2450.0,
        estado: "Activo",
    },
    {
        id: 2,
        nombre: "Mercado Orgánico",
        contacto: "compras@mercadorganico.com",
        telefono: "+1 234-567-8902",
        fecha_registro: "2023-11-20",
        total_compras: 1850.0,
        estado: "Activo",
    },
    {
        id: 3,
        nombre: "Carnicería Local",
        contacto: "pedidos@carnicerialocal.com",
        telefono: "+1 234-567-8903",
        fecha_registro: "2023-10-10",
        total_compras: 3200.0,
        estado: "Activo",
    },
    {
        id: 4,
        nombre: "Tienda Gourmet",
        contacto: "info@tiendagourmet.com",
        telefono: "+1 234-567-8904",
        fecha_registro: "2023-09-05",
        total_compras: 980.0,
        estado: "Inactivo",
    },
    {
        id: 5,
        nombre: "Restaurante Vegano",
        contacto: "contacto@veganrest.com",
        telefono: "+1 234-567-8905",
        fecha_registro: "2024-01-08",
        total_compras: 1280.0,
        estado: "Activo",
    },
]

export default function ClientesPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Gestión de Clientes</h1>
                            <p className="text-muted-foreground">Administra la base de datos de clientes y sus compras</p>
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
                                Nuevo Cliente
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                                <Users className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">42</div>
                                <p className="text-xs text-muted-foreground">+3 nuevos este mes</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">38</div>
                                <p className="text-xs text-muted-foreground">90% del total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Valor Promedio</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$1,952</div>
                                <p className="text-xs text-muted-foreground">Por cliente activo</p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Nuevos Este Mes</CardTitle>
                                <div className="h-4 w-4 rounded-full bg-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3</div>
                                <p className="text-xs text-muted-foreground">+50% vs mes anterior</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabla de Clientes */}
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Listado de Clientes</CardTitle>
                            <CardDescription>Información completa de todos los clientes registrados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Contacto</TableHead>
                                            <TableHead>Teléfono</TableHead>
                                            <TableHead>Total Compras</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Fecha Registro</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clientes.map((cliente) => (
                                            <TableRow key={cliente.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>
                                                                {cliente.nombre
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")
                                                                    .slice(0, 2)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">{cliente.nombre}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{cliente.contacto}</TableCell>
                                                <TableCell>{cliente.telefono}</TableCell>
                                                <TableCell>${cliente.total_compras.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <Badge className={cliente.estado === "Activo" ? "bg-primary" : "bg-red-500"}>
                                                        {cliente.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{new Date(cliente.fecha_registro).toLocaleDateString()}</TableCell>
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
