"use client";

import { colorEstado } from "@/elementos/colores";
import styles from "@/componentes/admin.module.css";
import { useAperturaTicket } from "../contexts/aperturaTicketContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMovimientoTicketQuery } from "@/services/apiTicket";
import { Loader } from "@/elementos/Loader";
import { traerFechaHora } from "@/funciones/traerFechaHora";

export const Ticket = ({ ticket, usuarioActual }) => {
  const {
    setDataTicket,
    obtenerUsuario,
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
          fechaHoraRegistro: fechaHora,
          descripcionMovimiento: `Apertura de ticket ${ticket.idTicket}`,
          idMovimientoTicket: data.length + 1,
        };
        crearMovimientoTicket({
          ...updatedCampos,
          legajoAsignado: usuarioActual.idUsuario,
        });
        actualizarTicket(updatedCampos);
        router.push(`/admin/ticket/movimientos-ticket/${ticket.idTicket}`);
      }
    } catch (error) {
      console.error("Error en handleClick:", error.message);
    }
  };
  const handlePopUp = () => {
    if (
      pathname !== "/admin/ticket/tickets-creados" &&
      ticket.idEstado === "nuevo"
    ) {
      refetch();
      setPopUp(true);
    } else {
      router.push(`movimientos-ticket/${ticket.idTicket}`);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {ticket && (
        <div onClick={handlePopUp} className="w-full relative cursor-pointer">
          <ul
            className={`flex flex-row px-12 justify-between text-[#161616] list-none bg-white border-b-2 border-opacity-5 h-[74px] hover:bg-[#f0f0f0] items-center  border-black transition-[3s] ${styles.listaTicket}`}
          >
            <li className={`w-[25%] ${styles.usuario}`}>
              <h1 className="font-semibold text-lg"> {ticket.nombreEmisor}</h1>
              <span className={`text-gray-600 ${styles.correo}`}>
                {ticket.correoUsuarioEmisor}
              </span>
            </li>
            <li
              className={`w-[35%] text-center font-semibold overflow-hidden py-0 px-4 ${styles.motivo}`}
            >
              {ticket.tituloTicket}
            </li>
            <li
              className={`w-[10%] text-center font-semibold ${styles.prioridad}`}
            >
              {ticket.prioridad}
            </li>
            <li className={`w-[12%] capitalize text-center ${styles.estado}`}>
              <span
                className={`${colorActual.bg}
            ${
              ticket.idEstado === "resuelto" ? "text-black" : "text-white"
            } py-1 px-2 rounded-full align-middle`}
              >
                {ticket.idEstado === "proceso" ? "En proceso" : ticket.idEstado}
              </span>
            </li>
            <li
              className={`w-[18%] text-end font-semibold text-gray-600 max-md:hidden ${styles.fecha}`}
            >
              {ticket.fechaHoraRegistro}
            </li>
          </ul>
        </div>
      )}
      {popUp && (
        <div className="flex p-4 flex-col justify-center gap-3 w-80 bg-[#efefef] absolute z-[999] overflow-hidden shadow-xl rounded-md">
          <h1 className="text-black font-semibold">
            ¿Quiere realizar la apertura del ticket {ticket.idTicket}?
          </h1>
          <div className="flex flex-row w-full justify-center gap-4 ">
            <button
              className="w-md px-4 py-1 bg-blue-700  text-white font-semibold hover:shadow-4xl transition"
              onClick={handleClick}
            >
              Aceptar
            </button>
            <button
              className="w-md px-4 py-1 bg-red-700  text-white font-semibold hover:shadow-4xl transition"
              onClick={() => setPopUp(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
