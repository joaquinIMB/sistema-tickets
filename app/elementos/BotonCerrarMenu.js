import Image from "next/image";
import { useDesplegable } from "@/contexts/desplegableContext";

export default function BotonCerrarMenu() {
  const {desplegar, setDesplegar} = useDesplegable()
  return (
    <button onClick={() => setDesplegar(!desplegar)} className={`m-auto mx-0 outline-none cursor-pointer ${desplegar ? "block " : "hidden max-lg:block "}  absolute right-[22px]`}>
      <Image
        className={` w-12 m-auto pt-1`}
        src="/cerrar.png"
        alt="Logo de busqueda"
        width={80}
        height={80}
      />
    </button>
  );
}
