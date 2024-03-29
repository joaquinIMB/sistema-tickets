"use client";

import { Suspense, useEffect, useState } from "react";
import { Loader } from "@/componentes/Loader";
import { HeaderListaTickets } from "@/componentes/HeaderListaTickets";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { useTraerDataTicket } from "@/hooks/useTraerDataTickets";

export const TraerTicketPorAsignado = ({ dataUsuario }) => {
  const [ticket, setTicket] = useState();
  const [usuarioActual, setUsuarioActual] = useState();
  const { usuario } = useAuth();
  const data = useTraerDataTicket();

  useEffect(() => {
    const usuarioActual = dataUsuario.find(
      (user) => user.correo === usuario.email
    );
    setUsuarioActual(usuarioActual);
    if (usuarioActual && data) {
      const ticketsDeUsuario = data.map(
        (ticket) => ticket.legajoAsignado === usuarioActual.idUsuario && ticket
      );
      return setTicket(ticketsDeUsuario);
    }
  }, [dataUsuario, usuario.email, data]);
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
