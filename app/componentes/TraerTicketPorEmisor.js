"use client";

import { useEffect, useMemo, useState } from "react";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { Error } from "./Error";
import { useGetTicketIdUsuarioEmisorQuery } from "@/services/apiTicket";

export const TraerTicketPorEmisor = ({ dataUsuario }) => {
  const { usuario } = useAuth();
  const [ticket, setTicket] = useState();

  const { data, error, refetch } = useGetTicketIdUsuarioEmisorQuery(
    usuario.legajo
  );

  const [usuarioActual, setUsuarioActual] = useState();

  useMemo(() => {
    if (dataUsuario) {
      const [usuarioActual] = dataUsuario.filter(
        (user) => user.correo.trim() === usuario.email
      );
      setUsuarioActual(usuarioActual);
    }
  }, [dataUsuario, usuario.email]);

  useEffect(() => {
    if (data) {
      setTicket(data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(interval);
  });

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
