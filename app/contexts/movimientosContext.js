"use client";

import { useContext, createContext, useState } from "react";

const MovimientoContext = createContext();

const useMovimientoTicket = () => {
  return useContext(MovimientoContext);
};

const MovimientoTicketProvider = ({ children }) => {
  const [campos, cambiarCampos] = useState({
    idTicket: "",
    idSector: "",
    idEstado: "",
    prioridad: "",
    legajoEmisor: "",
    legajoAsignado: "",
    nombreUsuarioAsignado: "",
    descripcionMovimiento: "",
  });

  return (
    <MovimientoContext.Provider value={{ campos, cambiarCampos }}>
      {children}
    </MovimientoContext.Provider>
  );
};

export { useMovimientoTicket, MovimientoTicketProvider };
