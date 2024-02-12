'use client'

import Image from "next/image";
import Link from "next/link";

const BotonCrearTicket = () => {
  return (
    < Link href={"/panel"} className="bg-blue-600 text-white text-sm hover:bg-blue-500 cursor-pointer transition-all rounded-md flex items-center justify-center gap-1 w-32 py-1">
      <Image
        src={"/mas.png"}
        alt="Logo en representación a la acción sumar"
        className="w-8"
        width={100}
        height={100}
      />
      Crear Ticket
    </Link>
  );
};

export default BotonCrearTicket;
