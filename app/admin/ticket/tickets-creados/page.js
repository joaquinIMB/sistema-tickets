import { TraerTicketPorEmisor } from "@/componentes/TraerTicketPorEmisor";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";

export const metadata = {
  title: "Tickets emitidos por mí - Helpdesk Unity - Sistema de tickets",
  description:
    "Página en donde veremos los tickets creados por el usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsCreados() {
  return (
    <>
      <HeaderListaTickets />
      <TraerTicketPorEmisor />
    </>
  );
}
