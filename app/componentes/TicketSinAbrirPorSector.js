"use client";

import { Suspense, useEffect, useState } from "react";
import { Loader } from "@/elementos/Loader";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";
import { useAuth } from "../contexts/authContext";
import { Ticket } from "./Ticket";
import { useTraerTicketsNuevos } from "@/hooks/useTraerTicketsNuevos";

export const TicketSinAbrirPorSector = ({ dataSector, dataUsuario }) => {
  const { usuario } = useAuth();
  const [ticket, setTicket] = useState();
  const [usuarioActual, setUsuarioActual] = useState();
  const data = useTraerTicketsNuevos();

  useEffect(() => {
    const usuarioActual = dataUsuario.find(
      (user) => user.correo === usuario.email
    );
    const sectorActual = dataSector.find(
      (sector) => sector.nombreSector === usuarioActual.idSector
    );
    setUsuarioActual(usuarioActual);
    if (sectorActual && data) {
      const ticketsDeSector = data.map(
        (ticket) =>
          ticket.idSector === sectorActual.nombreSector &&
          ticket.legajoAsignado === "Todos" &&
          ticket
      );
      return setTicket(ticketsDeSector);
    }
  }, [dataSector, data, dataUsuario, usuario.email]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <HeaderListaTickets />
        {ticket &&
          ticket.map((ticket) => (
            <Ticket
              key={ticket.idTicket}
              ticket={ticket}
              usuarioActual={usuarioActual}
            />
          ))}
      </Suspense>
    </>
  );
};
