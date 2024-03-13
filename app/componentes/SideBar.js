import { poppins } from "./fuentes";
import Link from "next/link";
import Image from "next/image";
import styles from "@/componentes/admin.module.css";

export const SideBar = ({ desplegar }) => {
  return (
    <>
      {desplegar === false && (
        <div
          className={`flex justify-center overflow-hidden relative ${styles.sideBarAdaptable} bg-neutral-950 w-[76px] h-full text-white ${poppins.className} `}
        >
          <div className="fixed top-0 w-[4.8rem]">
            <nav className="flex flex-col justify-between h-full">
              <ul className="flex flex-col">
                <li className="py-2 p-3">
                  <Image
                    src={"/pd.png"}
                    className="m-auto pb-1 border-b border-black border-opacity-5"
                    alt="Logo de Punto Deportivo"
                    width={100}
                    height={100}
                  />
                </li>
                <li>
                  <Link
                    className={`overflow-hidden flex w-full flex-col items-center relative py-2 text-sm transition-all hover:text-gray-300  ${styles.enlaceActivo}`}
                    href={"/admin/ticket/tickets-sin-abrir"}
                  >
                    <Image
                      src={"/boleto.png"}
                      alt={`Logo Tickets de menu desplegable`}
                      className={`w-10 object-contain relative z-10`}
                      width={100}
                      height={100}
                    />
                  </Link>
                </li>
                {/* <li className="py-2">
              <Image
                src={"/informacion.png"}
                className="m-auto w-8 border-b shadow-5xl border-black border-opacity-5"
                alt="Logo de Punto Deportivo"
                width={100}
                height={100}
              />
            </li>
            <li className="py-2">
              <Image
                src={"/ajuste.png"}
                className="m-auto w-8 border-b shadow-5xl border-black border-opacity-5"
                alt="Logo de Punto Deportivo"
                width={100}
                height={100}
              />
            </li> */}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
