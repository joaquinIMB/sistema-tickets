"use client";

import { Suspense, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { HeaderListaTickets } from "./HeaderListaTickets";
import { useAuth } from "../contexts/authContext";
import { Ticket } from "./Ticket";

export const TicketSinAbrirPorSector = ({
  dataTicket,
  dataSector,
  dataUsuario,
}) => {
  const { usuario } = useAuth();
  const [ticket, setTicket] = useState();
  useEffect(() => {
    const usuarioActual = dataUsuario.find(
      (user) => user.correo === usuario.email
    );
    const sectorActual = dataSector.find(
      (sector) => sector.nombreSector === usuarioActual.idSector
    );
    if (sectorActual) {
      const ticketsDeSector = dataTicket.map(
        (ticket) =>
          ticket.idSector === sectorActual.nombreSector && ticket.legajoAsignado === "Todos" && ticket
      );
      return setTicket(ticketsDeSector);
    }
  }, [dataSector, dataTicket, dataUsuario, usuario.email]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <HeaderListaTickets />
        {ticket &&
          ticket.map((ticket) => (
            <Ticket key={ticket.idTicket} ticket={ticket} />
          ))}
      </Suspense>
    </>
  );
};
