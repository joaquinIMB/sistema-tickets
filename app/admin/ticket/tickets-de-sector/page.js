import { TicketSinAbrirPorSector } from "@/componentes/TicketSinAbrirPorSector";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";

export const metadata = {
  title: "Tickets nuevos de mi sector - Helpdesk Unity - Sistema de tickets",
  description:
    "Tickets nuevos en sector asignado a usuario, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsSinAbrir() {
  return (
    <>
      <HeaderListaTickets />
      <TicketSinAbrirPorSector />
    </>
  );
}
