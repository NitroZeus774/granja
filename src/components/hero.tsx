export default function Hero() {
  return (
    <section className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white" style={{ backgroundImage: 'url(/the_granja_image_2.jpeg)' }}>
      <div className="border p-[50px] backdrop-blur-sm">
              <h2 className="text-5xl font-bold mb-4">Bienvenido a nuestra granja</h2>
              <p className="text-xl text-center font-bold drop-shadow-md">Productos naturales y frescos directamente del campo</p>
      </div>
    </section>
  );
}
