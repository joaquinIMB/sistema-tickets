"use client";

import { usePathname } from "next/navigation";
import { listaCategorias, listaEstados, listaSideBar } from "@/elementos/listaEnlaces";
import { useEffect, useState } from "react";

export const BuscaRuta = () => {
  const pathname = usePathname();
  const [enlace, establecerEnlace] = useState();
  useEffect(() => {
    const recorrerEnlaces = (listaEnlaces) => {
      listaEnlaces.map((enlace) => {
        enlace.href === pathname ? establecerEnlace(enlace.label) : "";
      });
    };
    recorrerEnlaces(listaCategorias);
    recorrerEnlaces(listaEstados);
    recorrerEnlaces(listaSideBar);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/admin/ticket/crear-ticket") {
      establecerEnlace("Crear ticket");
    }
    if (pathname.slice(0, 32) === "/admin/ticket/movimientos-ticket") {
      establecerEnlace("Movimientos");
    }
    if (pathname.slice(0, 19) === "/admin/ticket/todos") {
      establecerEnlace("Todos");
    }
  }, [pathname]);

  return (
    <div className="flex gap-2 items-center">
      <h1
        className={`capitalize text-[22px] text-slate-800 font-semibold${
          enlace != "Tickets" && "text-xl"
        }`}
      >{`${enlace != undefined ? enlace : "Crear ticket"}`}</h1>
    </div>
  );
};
