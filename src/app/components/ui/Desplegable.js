import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { listaEnlaces } from "./listaEnlaces";
import { usePathname } from "next/navigation";
import styles from "@/app/components/ui/enlaceActivo.module.css";

const Desplegable = () => {
  const [isOpen, setIsOpen] = useState(true);

  const cambiarDesplegable = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  const enlacesDesplegables = listaEnlaces.slice(2, 5);

  return (
    <li className="py-3 cursor-pointer relative dark:hover:text-gray-50">
      <div
        className="flex flex-col gap-2 items-center"
        onClick={cambiarDesplegable}
      >
        <Image
          src={"/boleto.png"}
          alt="Logo boleto de menu desplegable"
          className={`w-7 object-contain`}
          width={100}
          height={100}
        />
        <button
          type="button"
          className="flex gap-2 rounded-lg items-center text-sm justify-center w-full"
        >
          Tickets
          <Image
            src={"/flecha-abajo.png"}
            alt="Flecha de menu desplegable"
            className={`${isOpen ? "rotate-180" : ""} w-3`}
            width={100}
            height={100}
          />
        </button>
      </div>
      {isOpen && (
        <div className=" flex flex-col cursor-auto gap-2 w-full left-0 my-2 py-3 mt-3">
          {enlacesDesplegables.map((enlace) => (
            <Link
              href={enlace.href}
              className={`flex gap-2 flex-col items-center rounded-sm py-2 relative z-20 text-sm transition-all hover:text-gray-300 ${
                pathname === enlace.href ? `${styles.enlaceActivo} hover:text-white` : ""
              } `}
              key={enlace.label}
            >
              <Image
                src={enlace.logo}
                alt={`Logo ${enlace.label} de menu desplegable`}
                className={`w-7 object-contain z-10`}
                width={100}
                height={100}
              />
              <span className="relative z-10">
              {enlace.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default Desplegable;
