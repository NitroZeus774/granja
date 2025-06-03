"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    MilkIcon as Cow,
    Leaf,
    MapPin,
    Package,
    PiggyBank,
    Settings,
    ShoppingCart,
    Users,
    Warehouse,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const pathname = usePathname()

    const navItems = [
        { href: "/dashboard", icon: Warehouse, label: "Dashboard" },
        { href: "/dashboard/animales", icon: Cow, label: "Animales" },
        { href: "/dashboard/plantas", icon: Leaf, label: "Plantas" },
        { href: "/dashboard/productos", icon: Package, label: "Productos" },
        { href: "/dashboard/clientes", icon: Users, label: "Clientes" },
        { href: "/dashboard/ventas", icon: ShoppingCart, label: "Ventas" },
        { href: "/dashboard/gastos", icon: PiggyBank, label: "Gastos" },
        { href: "/dashboard/ubicaciones", icon: MapPin, label: "Ubicaciones" },
    ]

    return (
        <aside
            className={`${isSidebarOpen ? "w-64" : "w-16"
                } bg-primary text-primary-foreground border-r border-primary/20 transition-all duration-300 hidden md:block`}
        >
            <div className="flex flex-col h-full">
                <div className="p-4 flex items-center justify-between border-b border-primary-foreground/20">
                    <h2 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>Los Prados</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-primary-foreground hover:bg-primary/80"
                    >
                        <Warehouse className="h-5 w-5" />
                    </Button>
                </div>
                <nav className="flex-1 p-2">
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start text-primary-foreground hover:bg-primary/80",
                                            !isSidebarOpen && "justify-center px-2",
                                            isActive && "bg-primary/80",
                                        )}
                                    >
                                        <Icon className="h-5 w-5 mr-2" />
                                        {isSidebarOpen && <span>{item.label}</span>}
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
                <div className="p-4 border-t border-primary-foreground/20">
                    <Link href="/dashboard/configuracion">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-primary-foreground hover:bg-primary/80",
                                !isSidebarOpen && "justify-center px-2",
                                pathname === "/configuracion" && "bg-primary/80",
                            )}
                        >
                            <Settings className="h-5 w-5 mr-2" />
                            {isSidebarOpen && <span>Configuración</span>}
                        </Button>
                    </Link>
                </div>
            </div>
        </aside>
    )
}
