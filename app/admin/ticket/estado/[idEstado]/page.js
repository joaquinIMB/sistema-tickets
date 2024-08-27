import { TraerTicketPorEstado } from "@/componentes/TraerTicketPorEstado";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";
import { listaEstados } from "@/elementos/listaEnlaces";

export function generateMetadata({ params, searchParams }, parent) {
  const { estado } = params;

  const estadoRef = listaEstados.find(
    (enlace) => enlace.estado === estado && enlace
  );

  if (estadoRef) {
    return {
      title: `Tickets ${estadoRef.label} - Helpdesk Unity - Sistema de tickets`,
      description: `Página de tickets ${estadoRef.label} en sistema de tickets Helpdesk Unity`,
    };
  }
}

export default async function TicketsPorEstados({ params }) {
  const { idEstado } = params;

  return (
    <>
      <HeaderListaTickets />
      <TraerTicketPorEstado idEstado={idEstado} />
    </>
  );
}
