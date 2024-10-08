"use client";

import { listaCategorias, listaEstados } from "@/elementos/listaEnlaces";
import Link from "next/link";
import { poppins } from "@/elementos/fuentes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BotonCrearTicket from "./BotonCrearTicket";
import styles from "@/componentes/admin.module.css";
import BotonCerrarMenu from "@/elementos/BotonCerrarMenu";
import BotonCerrarSesion from "./BotonCerrarSesion";
import { TotalTickets } from "./TotalTicketsPorSeccion";
import { useAuth } from "@/contexts/authContext";
import {
  useGetTicketIdSectorQuery,
  useGetTicketIdUsuarioAsignadoQuery,
  useGetTicketIdUsuarioEmisorQuery,
  useGetTodosTicketsIdSectorQuery,
} from "@/services/apiTicket";
import { BarraBusqueda } from "./BarraBusqueda";
import useInactivityTimeout from "@/hooks/useInactivityTimeout";
import { ListaTodosLosTickets } from "./ListaTodosLosTickets";

export const SubNav = ({ desplegar, setDesplegar }) => {
  const { usuario } = useAuth();

  const {
    data: ticketsNuevos,
    isLoading: isLoadingTicketsNuevos,
    refetch: refetchTicketsNuevos,
  } = useGetTicketIdSectorQuery(usuario.idSector);
  const {
    data: ticketsAsignado,
    isLoading: isLoadingTicketsAsignado,
    refetch: refetchTicketsAsignado,
  } = useGetTicketIdUsuarioAsignadoQuery(usuario.legajo);
  const {
    data: ticketsEmisor,
    isLoading: isLoadingTicketsEmisor,
    refetch: refetchTicketsEmisor,
  } = useGetTicketIdUsuarioEmisorQuery(usuario.legajo);
  const {
    data: ticketsSector,
    isLoading: isLoadingTicketsSector,
    refetch: refetchTicketsSector,
  } = useGetTodosTicketsIdSectorQuery(usuario.idSector);
  const isRefetchActive = useInactivityTimeout(12000);

  useEffect(() => {
    if (isRefetchActive) {
      const interval = setInterval(() => {
        refetchTicketsNuevos();
        refetchTicketsAsignado();
        refetchTicketsEmisor();
        refetchTicketsSector();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [
    refetchTicketsNuevos,
    refetchTicketsAsignado,
    refetchTicketsEmisor,
    refetchTicketsSector,
    isRefetchActive,
  ]);

  const pathname = usePathname();
  const [ruta, cambiarRuta] = useState();

  useEffect(() => {
    const path = pathname.slice(0, 6);
    if (path === "/admin") {
      cambiarRuta("Tickets");
    }
  }, [pathname]);

  return (
    <>
      <section
        className={`${
          desplegar
            ? `w-[260px] absolute z-[999] ${styles.asideAdaptable}`
            : "relative z-[99]"
        } transition-all flex flex-col overflow-hidden`}
        onClick={() => setDesplegar(false)}
      >
        <main
          className={`${
            desplegar ? "overflow-hidden" : "overflow-visible"
          } left-[76px] h-screen bg-gradient-to-r w-[260px] from-[#f7f7f7] to-[#ffffff] border-r ${
            styles.subNavAdaptable
          } border-black border-opacity-5 overflow-Y-auto`}
        >
          <header
            className={`flex flex-row relative ${
              desplegar
                ? "justify-start items-center px-4"
                : "justify-between px-3"
            } pt-[10px] pb-[8px] items-center w-[260px]`}
          >
            {desplegar && <BotonCerrarMenu />}
            <h1 className="capitalize text-[28px] text-gray-800 font-semibold">{`${ruta}`}</h1>
            {!desplegar && <BotonCrearTicket />}
          </header>
          {!desplegar && (
            <BarraBusqueda
              idSector={usuario.idSector}
              idUsuario={usuario.legajo}
            />
          )}
          <nav className={`${poppins.className} w-[260px]`}>
            <ul className={`py-2 px-3 pl-1 flex flex-col text-zinc-900 gap-2 `}>
                <ListaTodosLosTickets
                  idSector={usuario.idSector}
                  pathname={pathname}
                  setDesplegar={setDesplegar}
                  totalTickets={ticketsSector && ticketsSector.length}
                  isLoadingTotaltickets={isLoadingTicketsSector}
                />
              {listaCategorias.map((enlace) => (
                <li
                  key={enlace.label}
                  className={` tracking-wide relative h-8 pt-2 ${
                    enlace.href === pathname
                      ? " text-blue-600 rounded-md"
                      : "hover:text-blue-600 "
                  }`}
                  onClick={() => setDesplegar(false)}
                >
                  <Link
                    className="relative left-0 w-full py-1 pb-2 px-2"
                    href={enlace.href}
                  >
                    {enlace.label}
                  </Link>
                  {isLoadingTicketsNuevos ||
                  isLoadingTicketsAsignado ||
                  isLoadingTicketsEmisor ||
                  isLoadingTicketsSector ? (
                    <TotalTickets background={"bg-gray-300"} cantidad={0} />
                  ) : (
                    <TotalTickets
                      background={"bg-gray-300"}
                      cantidad={
                        enlace.seccion === "ticketsSector"
                          ? ticketsNuevos.length
                          : enlace.seccion === "ticketsAsignado"
                          ? ticketsAsignado.length
                          : ticketsEmisor.length
                      }
                    />
                  )}
                </li>
              ))}
              <span className="p-2 tracking-wide text-[#707070b2]">
                Mis tickets por estado
              </span>
              {listaEstados.map((enlace, index) => {
                const ticketsPorEstado = ticketsAsignado
                  ? ticketsAsignado.filter(
                      (ticket) => ticket.idEstado === enlace.estado
                    ).length
                  : 0;
                return (
                  <li
                    key={index}
                    className={`tracking-wide relative h-8  ${
                      enlace.href === pathname
                        ? " text-blue-600 rounded-md"
                        : "hover:text-blue-600 "
                    }`}
                    onClick={() => setDesplegar(false)}
                  >
                    <Link
                      className="absolute left-0 w-full pb-2 pt-[0.25rem] px-2"
                      href={enlace.href}
                    >
                      {enlace.label}
                    </Link>
                    <TotalTickets
                      background={"bg-gray-300"}
                      cantidad={ticketsPorEstado}
                    />
                  </li>
                );
              })}
              <BotonCerrarSesion />
            </ul>
          </nav>
        </main>
      </section>
    </>
  );
};
