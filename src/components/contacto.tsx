export default function Contacto() {
  return (
    <section id="contacto" className="p-8 bg-gray-100">
      <h3 className="text-3xl font-bold mb-4">Contáctanos</h3>
      <form className="flex flex-col gap-4 max-w-md">
        <input type="text" placeholder="Nombre" className="border p-2" />
        <input type="email" placeholder="Correo electrónico" className="border p-2" />
        <textarea placeholder="Mensaje" className="border p-2"></textarea>
        <button type="submit" className="bg-green-600 text-white py-2">Enviar</button>
      </form>
    </section>
  );
}
