"use client";

import { useEffect, useMemo, useState } from "react";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { Error } from "./Error";
import { useGetTicketIdUsuarioEmisorQuery } from "@/services/apiTicket";
import useInactivityTimeout from "@/hooks/useInactivityTimeout";

export const TraerTicketPorEmisor = () => {
  const { usuario } = useAuth();
  const [ticket, setTicket] = useState();
  const isRefetchActive = useInactivityTimeout(12000);
  const [usuarioActual, setUsuarioActual] = useState();

  const { data, error, refetch } = useGetTicketIdUsuarioEmisorQuery(
    usuario.legajo
  );

  useEffect(() => {
    if (usuario) {
      setUsuarioActual(usuario);
    }
  }, [usuario]);

  useEffect(() => {
    if (data) {
      const sortedTickets = [...data].sort((a, b) => b.idTicket - a.idTicket);
      setTicket(sortedTickets);
    }
  }, [data]);

  useEffect(() => {
    if (isRefetchActive) {
      const interval = setInterval(() => {
        refetch();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [refetch, isRefetchActive]);

  if (error) return <Error error={error} refetch={refetch} />;
  return (
    <>
      {ticket &&
        ticket.map((ticket) => (
          <Ticket
            key={ticket.idTicket}
            ticket={ticket}
            usuarioActual={usuarioActual}
          />
        ))}
    </>
  );
};
