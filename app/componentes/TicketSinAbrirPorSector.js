"use client";

import { useEffect, useMemo, useState } from "react";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { Error } from "./Error";
import { useGetTicketIdSectorQuery } from "@/services/apiTicket";
import useInactivityTimeout from "@/hooks/useInactivityTimeout";

export const TicketSinAbrirPorSector = ({ dataUsuario }) => {
  const { usuario } = useAuth();
  const [tickets, setTickets] = useState([]);
  const { data, error, refetch } = useGetTicketIdSectorQuery(usuario.idSector);
  const [usuarioActual, setUsuarioActual] = useState();
  const isRefetchActive = useInactivityTimeout(12000);

  useEffect(() => {
    if (usuario) {
      setUsuarioActual(usuario);
    }
  }, [usuario]);

  useEffect(() => {
    if (data) {
      const sortedTickets = [...data].sort((a, b) => b.idTicket - a.idTicket);

      setTickets(sortedTickets);
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
      {tickets.map((ticket) => (
        <Ticket
          key={ticket.idTicket}
          ticket={ticket}
          usuarioActual={usuarioActual}
        />
      ))}
    </>
  );
};
