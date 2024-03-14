'use client'

import Image from "next/image";
import Link from "next/link";

const BotonCrearTicket = () => {
  return (
    < Link href={"/admin/ticket/crear-ticket"} className="rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 cursor-pointer transition-all flex items-center justify-center gap-1 w-32 py-1 max-h-10">
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
