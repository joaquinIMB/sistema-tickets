import Image from "next/image";
import { useState } from "react";

export const BotonOpciones = () => {
  const [opciones, setOpciones] = useState(false);
  return (
    <button
      onClick={() => setOpciones(!opciones)}
      className="w-md m-2 hover:shadow-4xl transition"
    >
      <Image
        src={"/mas.png"}
        alt="Logo en representación a la acción sumar"
        className={`w-8 transition-all duration-300 ${opciones && "rotate-[135deg]"}`}
        width={100}
        height={100}
      />
    </button>
  );
};
