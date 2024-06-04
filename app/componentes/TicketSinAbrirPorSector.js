"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Loader } from "@/elementos/Loader";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";
import { useAuth } from "../contexts/authContext";
import { Ticket } from "./Ticket";
import { useGetNewTicketsQuery } from "@/services/apiTicket";

export const TicketSinAbrirPorSector = ({ dataSector, dataUsuario }) => {
  const { usuario } = useAuth();
  const [ticket, setTicket] = useState();
  const [usuarioActual, setUsuarioActual] = useState();
  const { data, error, isLoading, refetch } = useGetNewTicketsQuery();

  useEffect(() => {
    const usuarioActual = dataUsuario.find(
      (user) => user.correo === usuario.email
    );
    const sectorActual = dataSector.find(
      (sector) => sector.nombreSector === usuarioActual.idSector
    );
    setUsuarioActual(usuarioActual);
    if (sectorActual && data) {
      const ticketsDeSector = data.filter(
        (ticket) =>
          ticket.idSector === sectorActual.nombreSector &&
          ticket.legajoAsignado === "Todos" &&
          ticket
      );
      return setTicket(ticketsDeSector);
    }
  }, [dataSector, data, dataUsuario, usuario.email]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <HeaderListaTickets />
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
