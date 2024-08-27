import { TraerTicketPorAsignado } from "@/componentes/TraerTicketPorAsignado";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";

export const metadata = {
  title: "Mis tickets a resolver - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para visualizar los tickets del usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function MisTickets() {

  return (
    <>
      <HeaderListaTickets />
      <TraerTicketPorAsignado />
    </>
  );
}
