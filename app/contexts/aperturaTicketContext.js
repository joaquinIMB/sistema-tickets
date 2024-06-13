"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateMovimientoTicketMutation,
  useUpdateTicketMutation,
} from "@/services/apiTicket";
import { traerFechaHora } from "@/funciones/traerFechaHora";

const AperturaTicketContext = createContext();

const useAperturaTicket = () => {
  return useContext(AperturaTicketContext);
};

function AperturaTicketProvider({ children }) {
  const [dataTicket, setDataTicket] = useState("");
  const [dataMovimiento, setDataMovimiento] = useState("");
  const [usuario, obtenerUsuario] = useState("");
  // const [campos, setCampos] = useState(null);
  const router = useRouter();
  const [actualizarTicket] = useUpdateTicketMutation();
  const [crearMovimientoTicket] = useCreateMovimientoTicketMutation();

  const fechaHora = traerFechaHora();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataTicket && usuario) {
          if (
            dataTicket.legajoAsignado === "Todos" &&
            dataTicket.nombreUsuarioAsignado === "Todos"
          ) {
            const updatedCampos = {
              ...dataTicket,
              idEstado: "abierto",
              nombreUsuarioAsignado: `${usuario.nombreUsuario} ${usuario.apellidoUsuario}`,
              fechaHoraRegistro: fechaHora,
              descripcionMovimiento: `Apertura de ticket ${dataTicket.idTicket}`,
            };
            crearMovimientoTicket({
              ...updatedCampos,
              idMovimientoTicket: dataMovimiento.idMovimientoTicket,
              legajoAsignado: usuario.idUsuario,
            });
            actualizarTicket(updatedCampos);
            obtenerUsuario("");
            setDataTicket("");
            router.push(
              `/admin/ticket/movimientos-ticket/${dataTicket.idTicket}`
            );
          }
        }
      } catch (error) {
        console.error("Error en el useEffect:", error);
      }
    };

    fetchData();
  }, [
    dataTicket,
    usuario,
    router,
    fechaHora,
    dataMovimiento,
    crearMovimientoTicket,
    actualizarTicket,
  ]);

  return (
    <AperturaTicketContext.Provider
      value={{ setDataTicket, obtenerUsuario, setDataMovimiento, crearMovimientoTicket, actualizarTicket }}
    >
      {children}
    </AperturaTicketContext.Provider>
  );
}

export { useAperturaTicket, AperturaTicketProvider };
