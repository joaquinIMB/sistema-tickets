import Image from "next/image";
import { useDesplegable } from "@/contexts/desplegableContext";

export default function BotonMenu() {
  const {desplegar, setDesplegar} = useDesplegable()
  return (
    <button onClick={() => setDesplegar(!desplegar)} className={`m-auto mx-0 outline-none cursor-pointer ${desplegar ? "block " : "hidden max-lg:block "}  absolute left-[18px]`}>
      <Image
        className={` w-9 m-auto`}
        src="/menu.png"
        alt="Logo de busqueda"
        width={80}
        height={80}
      />
    </button>
  );
}
