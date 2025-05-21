import { useRouter } from "next/navigation"

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-green-700 text-white sticky top-0 z-10">
      <h1 className="text-2xl font-bold">Granja El Buen Vivir</h1>
      <nav className="space-x-4">
        <a href="#about" className="hover:underline">Nosotros</a>
        <a href="#servicios" className="hover:underline">Servicios</a>
        <a href="#productos" className="hover:underline">Productos</a>
              <a href="#contacto" className="hover:underline">Contacto</a>
              <a href="/login">Iniciar sesion</a>
              <a href="/registro">Registrarse</a>

      </nav>
    </header>
  );
}
