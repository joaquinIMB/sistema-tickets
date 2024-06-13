"use client";

import { listaCategorias, listaEstados } from "@/elementos/listaEnlaces";
import Link from "next/link";
import { poppins } from "@/elementos/fuentes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BotonCrearTicket from "./BotonCrearTicket";
import Image from "next/image";
import styles from "@/componentes/admin.module.css";

export const SubNav = ({ desplegar, setDesplegar }) => {
  const pathname = usePathname();
  const [ruta, cambiarRuta] = useState();

  useEffect(() => {
    const path = pathname.slice(0, 6);
    if (path === "/admin") {
      cambiarRuta("Tickets");
    } else if (path === "/ajustes") {
      cambiarRuta("Ajustes");
    }
  }, [pathname]);

  return (
    <>
      <section
        className={`${
          !desplegar
            ? `w-[300px] ${styles.asideAdaptable}`
            : "w-0 left-[76px] absolute z-[99] max-md:left-[58px]"
        } transition-all flex flex-col overflow-hidden`}
      >
        <main
          className={`${
            !desplegar ? "overflow-hidden" : "overflow-visible"
          } left-[76px] h-screen bg-gradient-to-r w-[inherit] from-[#f7f7f7] to-[#ffffff] border-r ${
            styles.subNavAdaptable
          } border-black border-opacity-5 overflow-Y-auto`}
        >
          <header className="flex flex-row justify-between py-4 px-6 items-center w-[300px]">
            <h1 className="capitalize text-[28px] text-gray-800 font-semibold">{`${ruta}`}</h1>
            <BotonCrearTicket />
          </header>
          <nav className={`${poppins.className} w-[300px]`}>
            <ul className={`py-2 px-6 flex flex-col text-zinc-900 gap-2 `}>
              {listaCategorias.map((enlace) => (
                <li
                  key={enlace.label}
                  className={` tracking-wide relative h-8 ${
                    enlace.href === pathname
                      ? "text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  <Link
                    className="absolute left-0 w-full py-1 pb-2 px-0"
                    href={enlace.href}
                  >
                    {enlace.label}
                  </Link>
                </li>
              ))}
              <span className="py-4 tracking-wide text-[#707070b2]">
                Mis tickets por estado
              </span>
              {listaEstados.map((enlace, index) => (
                <li
                  key={index}
                  className={`tracking-wide relative h-9  ${
                    enlace.href === pathname
                      ? "text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  <Link
                    className="absolute left-0 w-full py-1 pb-2 px-0"
                    href={enlace.href}
                    onClick={() => setDesplegar(true)}
                  >
                    {enlace.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Image
            src={"/flecha.png"}
            alt="Logo flecha para desplegar menu de opciones"
            width={100}
            height={100}
            className="w-5 bottom-5 right-5 absolute cursor-pointer rotate-180 z-50"
            onClick={() => setDesplegar(true)}
          />
        </main>
      </section>
    </>
  );
};
