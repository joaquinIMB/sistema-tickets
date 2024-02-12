"use client";

import { listaCategorias, listaEstados } from "./listaEnlaces";
import Link from "next/link";
import { poppins } from "./fuentes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SubNav = () => {
  const pathname = usePathname();
  const [ruta, cambiarRuta] = useState();
  useEffect(() => {
    const path = pathname.slice(0, 6);
    if (path === "/panel") {
      cambiarRuta("Tickets");
    }
    else if(path === "/ajustes"){
      cambiarRuta("Ajustes")
    }
  }, [pathname]);

  return (
    <>
      <section
        className={`w-80 bg-gradient-to-r from-[#f1f1f1] to-[#f0f0f0] flex flex-col relative z-50`}
      >
        <div className="flex flex-row justify-start py-4 px-8 h-16 sticky top-0">
          {" "}
          <h1 className="capitalize text-[28px] text-gray-800 font-semibold">{`${ruta}`}</h1>
        </div>
        <nav className={`${poppins.className} h-full`}>
          <ul className="py-2 px-10 flex flex-col text-zinc-900 gap-2 fixed">
            <span className="p-0 tracking-wide text-[#707070b2]">
              <hr />
            </span>
            {listaCategorias.map((enlace) => (
              <li
                key={enlace.label}
                className={`py-1 px-0 tracking-wide ${
                  enlace.href === pathname ? "text-blue-600" : ""
                }`}
              >
                <Link href={enlace.href}>{enlace.label}</Link>
              </li>
            ))}
            <span className="p-0 tracking-wide text-[#707070b2]">
              <hr />
            </span>
            {listaEstados.map((enlace, index) => (
              <li
                key={index}
                className={`py-1 px-0 tracking-wide ${
                  enlace.href === pathname ? "text-blue-600" : ""
                }`}
              >
                <Link href={enlace.href}>{enlace.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
};
