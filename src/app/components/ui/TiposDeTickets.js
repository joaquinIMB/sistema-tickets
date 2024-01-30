import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { contextoSubNav } from "@/app/context/contextoSideBar";
import styles from "@/app/components/ui/enlaceActivo.module.css";
import Link from "next/link";
import { listaEnlaces } from "./listaEnlaces";

const TiposDeTickets = () => {
  const { isOpen, setIsOpen } = useContext(contextoSubNav);
  const [enlace] = listaEnlaces.slice(2, 3);
  const pathname = usePathname();
  return (
    <li
      className="py-3 cursor-pointer relative dark:hover:text-gray-50"
      onClick={() => setIsOpen(true)}
    >
      <Link
        href={`${enlace.href}`}
        className={`flex flex-col gap-2 items-center hover:text-gray-300`}
      >
        <Image
          src={"/boleto.png"}
          alt="Logo boleto de menu desplegable"
          className={`w-7 object-contain relative z-10`}
          width={100}
          height={100}
        />
        <button
          type="button"
          className={`flex gap-2 rounded-lg items-center text-sm justify-center w-full ${
            isOpen ? `${styles.enlaceActivo} hover:text-white` : ""
          }`}
        >
          <span className="relative z-10">Tickets</span>
        </button>
      </Link>
      {/* const enlacesDesplegables = listaEnlaces.slice(2, 5);*/}
      {/* {isOpen && (
        <div className=" flex flex-col cursor-auto gap-2 w-full left-0 my-2 py-3 mt-3">
          {enlacesDesplegables.map((enlace) => (
            <Link
              href={enlace.href}
              className={`flex gap-2 flex-col items-center rounded-sm py-2 relative z-20 text-sm transition-all hover:text-gray-300 ${
                pathname === enlace.href
                  ? `${styles.enlaceActivo} hover:text-white`
                  : ""
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
              <span className="relative z-10">{enlace.label}</span>
            </Link>
          ))}
        </div>
      )} */}
    </li>
  );
};

export default TiposDeTickets;
