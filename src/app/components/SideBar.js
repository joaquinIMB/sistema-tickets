"use client";

import { poppins } from "./ui/fuentes";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { listaSideBar, listaSubNav } from "./ui/listaEnlaces";
import styles from "@/app/components/ui/enlaceActivo.module.css";

export const SideBar = () => {
  const pathname = usePathname();
  return (
    <div
      className={`absolute flex justify-center w-full overflow-hidden bg-neutral-950 h-full text-white ${poppins.className}`}
    >
      <div className="fixed top-0 overflow-hidden w-[4.8rem]">
        <nav className="flex flex-col justify-between h-screen">
          <ul className="flex flex-col">
            <li>
              <Image
                src={"/pd.png"}
                className="m-auto pb-1 border-b border-black border-opacity-5"
                alt="Logo de Punto Deportivo"
                width={50}
                height={50}
              />
            </li>
            {listaSideBar.map((enlace) => {
              return (
                <li key={enlace.label}>
                  <Link
                    className={` flex w-full flex-col items-center relative py-2 text-sm transition-all hover:text-gray-300  ${styles.enlaceActivo}`}
                    href={enlace.href}
                  >
                    <Image
                      src={enlace.logo}
                      alt={`Logo ${enlace.label} de menu desplegable`}
                      className={`w-9 object-contain relative z-10`}
                      width={100}
                      height={100}
                    />
                    <span className="relative z-10">{enlace.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col pb-4 gap-4">
            <li>
              <Image
                src={"/informacion.png"}
                className="m-auto w-8 border-b shadow-5xl border-black border-opacity-5"
                alt="Logo de Punto Deportivo"
                width={50}
                height={50}
              />
            </li>
            <li>
              <Image
                src={"/ajuste.png"}
                className="m-auto w-8 border-b shadow-5xl border-black border-opacity-5"
                alt="Logo de Punto Deportivo"
                width={50}
                height={50}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
