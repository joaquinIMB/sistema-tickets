import Image from "next/image";

const Boton = () => {
  return (
    <div className="bg-blue-600 text-white text-sm hover:bg-blue-500 cursor-pointer transition-all rounded-md flex items-center justify-center gap-1 w-28 py-2">
      <Image
        src={"/mas.png"}
        alt="Logo en representación a la acción sumar"
        className="w-6"
        width={100}
        height={100}
      />
      Crear Ticket
    </div>
  );
};

export default Boton;