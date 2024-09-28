"use client";

import { colorEstado } from "@/elementos/colores";
import { useAperturaTicket } from "../contexts/aperturaTicketContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMovimientoTicketQuery } from "@/services/apiTicket";
import { traerFechaHora } from "@/funciones/traerFechaHora";
import { SkeletonTicket } from "@/elementos/skeletons/SkeletonTicket";
import { ModalAperturaTicket } from "./ModalAperturaTicket";

export const Ticket = ({ ticket, usuarioActual }) => {
  const [showPopover, setShowPopover] = useState(false);
  const {
    obtenerUsuario,
    setDataTicket,
    setDataMovimiento,
    crearMovimientoTicket,
    actualizarTicket,
  } = useAperturaTicket();
  const pathname = usePathname();
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();
  const { data, error, isLoading, refetch } = useGetMovimientoTicketQuery(
    ticket.idTicket
  );
  const colorActual = colorEstado.find(
    (color) => color.estado === ticket.idEstado
  );
  const fechaHora = traerFechaHora();

  const handleClick = () => {
    try {
      if (
        pathname !== "/admin/ticket/tickets-creados" &&
        ticket.idEstado === "nuevo" &&
        ticket.legajoAsignado === "Todos" &&
        ticket.nombreUsuarioAsignado === "Todos"
      ) {
        obtenerUsuario(usuarioActual);
        setDataTicket({
          ...ticket,
        });
        setDataMovimiento({
          idMovimientoTicket: data.length + 1,
        });
      } else if (
        ticket.legajoAsignado !== "Todos" &&
        ticket.nombreUsuarioAsignado !== "Todos"
      ) {
        const updatedCampos = {
          ...ticket,
          idEstado: "abierto",
          legajoEmisor: usuarioActual.legajo,
          legajoAsignado: usuarioActual.legajo,
          fechaHoraRegistro: fechaHora,
          descripcionMovimiento: `Apertura de ticket ${ticket.idTicket}`,
          idMovimientoTicket: data.length + 1,
        };
        crearMovimientoTicket(updatedCampos);
        actualizarTicket(updatedCampos);
        router.push(`/admin/ticket/movimientos-ticket/${ticket.idTicket}`);
      } else if (
        ticket.idEstado != "nuevo" &&
        ticket.legajoAsignado === "Todos" &&
        ticket.nombreUsuarioAsignado === "Todos"
      ) {
        const updatedCampos = {
          ...ticket,
          legajoAsignado: usuarioActual.legajo,
          fechaHoraRegistro: fechaHora,
          descripcionMovimiento: `${usuarioActual.legajo} tomó el ticket ${ticket.idTicket}`,
          idMovimientoTicket: data.length + 1,
          nombreUsuarioAsignado:
            usuarioActual.nombreUsuario + " " + usuarioActual.apellidoUsuario,
        };
        crearMovimientoTicket(updatedCampos);
        actualizarTicket(updatedCampos);
        router.push(`/admin/ticket/movimientos-ticket/${ticket.idTicket}`);
      }
    } catch (error) {
      console.error("Error en handleClick:", error.message);
    }
  };
  const handlePopUp = () => {
    const primerMovimiento =
      data && data.filter((movimiento) => movimiento.idMovimientoTicket === 1);
    const [movimiento] = primerMovimiento;
    if (
      pathname !== "/admin/ticket/tickets-creados" &&
      pathname !== "/admin/ticket/ticket/mis-tickets" &&
      Number(usuarioActual.legajo) !== movimiento.legajoEmisor &&
      ticket.legajoAsignado === "Todos"
    ) {
      refetch();
      setPopUp(true);
    } else {
      router.replace(`/admin/ticket/movimientos-ticket/${ticket.idTicket}`);
    }
  };

  if (isLoading) return <SkeletonTicket />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {ticket && (
        <div
          className="relative w-full cursor-pointer"
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
          onClick={handlePopUp} // Si tienes una función de popup
        >
          <ul className="max-md:gap-2 flex flex-row px-12 justify-between text-[#161616] list-none bg-white border-b-2 border-opacity-5 h-[60px] hover:bg-[#f0f0f0] items-center border-black transition-all">
            <li className="w-[5%] text-left">
              <h1 className="font-semibold text-md"> {ticket.idTicket}</h1>
            </li>
            <li className="w-[25%] truncate">
              <h1 className="font-semibold text-md"> {ticket.nombreEmisor}</h1>
            </li>
            <li className="w-[25%] text-left font-semibold overflow-hidden py-0 px-4">
              {ticket.tituloTicket}
            </li>
            <li className="w-[10%] text-center font-semibold">
              {ticket.prioridad}
            </li>
            <li className="w-[12%] capitalize text-center">
              <span
                className={`${colorActual.bg}
            ${
              ticket.idEstado === "resuelto" ? "text-black" : "text-white"
            } py-1 px-2 rounded-full align-middle`}
              >
                {ticket.idEstado === "proceso" ? "Proceso" : ticket.idEstado}
              </span>
            </li>
            <li className="w-[18%] text-end font-semibold text-gray-600 max-sm:hidden">
              {ticket.fechaHoraRegistro}
            </li>
          </ul>

          {/* Popover */}
          {showPopover && (
            <div className="absolute top-[-10px] left-[50%] bg-gray-100 border border-gray-300 text-sm text-gray-700 p-2 rounded-md shadow-lg transform -translate-x-1/2 z-10">
              Usuario Responsable: {ticket.nombreUsuarioAsignado || "Ninguno"}
            </div>
          )}
        </div>
      )}
      {popUp && (
        <ModalAperturaTicket
          setPopUp={setPopUp}
          handleClick={handleClick}
          ticket={ticket}
        />
      )}
    </>
  );
};
