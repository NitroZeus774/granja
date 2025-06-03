"use client"

import { User, Bell, Shield, Database, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ConfiguracionPage() {
    return (
        <div className="flex min-h-screen bg-secondary">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-accent">Configuración del Sistema</h1>
                            <p className="text-muted-foreground">Administra las configuraciones generales de La Granja</p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Configuración de Usuario */}
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Perfil de Usuario
                                </CardTitle>
                                <CardDescription>Gestiona tu información personal y preferencias</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nombre de Usuario</label>
                                    <div className="text-sm text-muted-foreground">Administrador</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Correo Electrónico</label>
                                    <div className="text-sm text-muted-foreground">admin@lagranja.com</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Rol</label>
                                    <div className="text-sm text-muted-foreground">Administrador Principal</div>
                                </div>
                                <Separator />
                                <Button variant="outline" className="w-full">
                                    Editar Perfil
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Configuración de Notificaciones */}
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-primary" />
                                    Notificaciones
                                </CardTitle>
                                <CardDescription>Configura las alertas y notificaciones del sistema</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">Alertas de Salud Animal</div>
                                        <div className="text-xs text-muted-foreground">Notificar cuando un animal esté enfermo</div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Activado
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">Stock Bajo</div>
                                        <div className="text-xs text-muted-foreground">Alertar cuando el inventario esté bajo</div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Activado
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">Ventas Diarias</div>
                                        <div className="text-xs text-muted-foreground">Resumen diario de ventas</div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Desactivado
                                    </Button>
                                </div>
                                <Separator />
                                <Button variant="outline" className="w-full">
                                    Configurar Notificaciones
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Configuración de Seguridad */}
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    Seguridad
                                </CardTitle>
                                <CardDescription>Gestiona la seguridad y accesos del sistema</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Última Sesión</label>
                                    <div className="text-sm text-muted-foreground">Hoy a las 14:30</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Autenticación de Dos Factores</label>
                                    <div className="text-sm text-muted-foreground">Desactivada</div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full">
                                        Cambiar Contraseña
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Activar 2FA
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Configuración de Base de Datos */}
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    Base de Datos
                                </CardTitle>
                                <CardDescription>Configuraciones de respaldo y mantenimiento</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Último Respaldo</label>
                                    <div className="text-sm text-muted-foreground">Ayer a las 02:00</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Respaldo Automático</label>
                                    <div className="text-sm text-muted-foreground">Diario a las 02:00</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tamaño de BD</label>
                                    <div className="text-sm text-muted-foreground">45.2 MB</div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full">
                                        Crear Respaldo
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Configurar Respaldos
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Configuración de Apariencia */}
                        <Card className="border-primary/20 md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-primary" />
                                    Apariencia y Tema
                                </CardTitle>
                                <CardDescription>Personaliza la apariencia del dashboard</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Tema Actual</label>
                                        <div className="text-sm text-muted-foreground">Tema de Granja (Verde)</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Color Primario</label>
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded-full bg-primary" />
                                            <span className="text-sm text-muted-foreground">#5d8c47</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Color Secundario</label>
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded-full bg-secondary border" />
                                            <span className="text-sm text-muted-foreground">#f5f9f2</span>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex gap-2">
                                    <Button variant="outline">Cambiar Tema</Button>
                                    <Button variant="outline">Personalizar Colores</Button>
                                    <Button variant="outline">Restablecer por Defecto</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
