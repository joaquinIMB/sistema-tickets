"use client";

import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { Loader } from "@/elementos/Loader";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";
import { useAuth } from "../contexts/authContext";
import { Ticket } from "./Ticket";
import { useGetNewTicketsQuery } from "@/services/apiTicket";
import { SkeletonTicket } from "@/elementos/skeletons/SkeletonTicket";
import { SkeletonHeaderListaTicket } from "@/elementos/skeletons/SkeletonHeaderTicket";

export const TicketSinAbrirPorSector = ({ dataSector, dataUsuario }) => {
  const { usuario } = useAuth();
  const [ticket, setTicket] = useState();
  const [usuarioActual, setUsuarioActual] = useState();
  const { data, error, isLoading, refetch } = useGetNewTicketsQuery();

  useEffect(() => {
    if (dataUsuario) {
      const [usuarioActual] = dataUsuario.filter(
        (user) => user.correo.trim() === usuario.email.trim()
      );
      const sectorActual = dataSector.filter(
        (sector) => sector.nombreSector === usuarioActual.idSector
      );

      setUsuarioActual(usuarioActual);
      if (sectorActual && data) {
        const [sector] = sectorActual;
        const ticketsDeSector = data.filter((ticket) => {
          if (
            ticket.idSector === sector.nombreSector &&
            ticket.legajoAsignado === "Todos"
          ) {
            return ticket;
          }
        });
        return setTicket(ticketsDeSector);
      }
    }
  }, [dataSector, data, dataUsuario, usuario.email]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  });
  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <SkeletonHeaderListaTicket />;

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
