import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Granja Los Prados - Productos Naturales",
    description: "Agricultura sostenible y productos naturales desde 1985",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <CartProvider>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </CartProvider>
            </body>
        </html>
    )
}
