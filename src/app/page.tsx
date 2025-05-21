"use client";
import Header from "gr/components/header";
import Hero from "gr/components/hero";
import About from "gr/components/about";
import Servicios from "gr/components/servicios";
import Productos from "gr/components/productos";
import Contacto from "gr/components/contacto";
import Footer from "gr/components/footer";



export default function Home() {
    const rol = sessionStorage.getItem("rol");

    return (
        <div className="text-black">
            <Header/>
            <Hero/>
            <About/>
            <Servicios/>
            <Productos/>
            <Contacto/>
            <Footer/>
        </div>
    );
}