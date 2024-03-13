"use client";

import { Suspense, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { HeaderListaTickets } from "./HeaderListaTickets";
import { Ticket } from "./Ticket";
import { useAuth } from "../contexts/authContext";

export const TraerTicketPorEmisor = ({ data, dataUsuario }) => {
  const [ticket, setTicket] = useState();
  const { usuario } = useAuth();
  useEffect(() => {
    const usuarioActual = dataUsuario.find(
      (user) => user.correo === usuario.email
    );
    if (usuarioActual) {
      const ticketsDeUsuario = data.map(
        (ticket) => ticket.legajoEmisor === usuarioActual.idUsuario && ticket
      );
      return setTicket(ticketsDeUsuario);
    } else {
      console.log("No se encuentra el usuario actual");
    }
  }, [dataUsuario, usuario.email, data]);
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
