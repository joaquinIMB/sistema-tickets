"use client";

import { colorEstado } from "./colores";
import styles from "@/componentes/admin.module.css";
import { useAperturaTicket } from "../contexts/aperturaTicketContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Ticket = ({ ticket, usuarioActual }) => {
  const { setData, obtenerUsuario } = useAperturaTicket();
  const pathname = usePathname();
  const [popUp, setPopUp] = useState(false);
  const router = useRouter()
  const colorActual = colorEstado.find(
    (color) => color.estado === ticket.idEstado
  );

  const handleClick = () => {
    try {
      if (
        pathname !== "/admin/ticket/tickets-creados" &&
        ticket.idEstado === "nuevo"
      ) {
        obtenerUsuario(usuarioActual);
        setData({ ...ticket });
      } else {
        return;
      }
    } catch (error) {
      console.error("Error en handleClick:", error.message);
    }
  };
  const handlePopUp = () =>{
    if(pathname !=="/admin/ticket/tickets-creados" && ticket.idEstado === "nuevo"){
      return setPopUp(true)
    }else{
      router.push(`movimientos-ticket/${ticket.idTicket}`)
    }
  }
  return (
    <>
      {ticket && (
        <div
          onClick={handlePopUp}
          className="w-full relative cursor-pointer"
        >
          <ul
            className={`flex flex-row px-12 justify-between text-[#161616] list-none bg-white border-b-2 border-opacity-5 h-[74px] hover:bg-[#f0f0f0] items-center  border-black ${styles.listaTicket}`}
          >
            <li className={`w-[25%] ${styles.usuario}`}>
              <h1 className="font-semibold text-lg"> {ticket.nombreEmisor}</h1>
              <span className={`text-gray-600 ${styles.correo}`}>
                {ticket.correoUsuarioEmisor}
              </span>
            </li>
            <li
              className={`w-[35%] text-center font-semibold overflow-hidden ${styles.motivo}`}
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
              className={`w-[18%] text-end font-semibold text-gray-600 ${styles.fecha}`}
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
