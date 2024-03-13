"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  crearMovimientoTicket,
  actualizarAperturaTicket,
} from "../firebase/CrearMovimientoTicket";

const AperturaTicketContext = createContext();

const useAperturaTicket = () => {
  return useContext(AperturaTicketContext);
};

function AperturaTicketProvider({ children }) {
  const [data, setData] = useState("");
  const [usuario, obtenerUsuario] = useState("");
  const [campos, setCampos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data && usuario && !campos) {
          if (
            data.legajoAsignado === "Todos" &&
            data.nombreUsuarioAsignado === "Todos"
          ) {
            const updatedCampos = {
              ...data,
              idEstado: "abierto",
              legajoAsignado: usuario.idUsuario,
              nombreUsuarioAsignado: `${usuario.nombreUsuario} ${usuario.apellidoUsuario}`,
            };

            await crearMovimientoTicket(updatedCampos);
            await actualizarAperturaTicket(updatedCampos);
            setCampos(null);
            obtenerUsuario("")
            setData("")
          }
        }
      } catch (error) {
        console.error("Error en el useEffect:", error);
      }
    };

    fetchData();
  }, [data, usuario, campos]);

  return (
    <AperturaTicketContext.Provider value={{ setData, obtenerUsuario }}>
      {children}
    </AperturaTicketContext.Provider>
  );
}

export { useAperturaTicket, AperturaTicketProvider };
