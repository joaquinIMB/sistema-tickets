import { TraerTicketPorEstado } from "@/componentes/TraerTicketPorEstado";
import { TraerTicketsDeSector } from "@/componentes/TraerTicketsDeSector";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";
import { listaEstados } from "@/elementos/listaEnlaces";

// export function generateMetadata({ params, searchParams }, parent) {
//   const { idSector } = params;

//   const estadoRef = listaEstados.find(
//     (enlace) => enlace.estado === estado && enlace
//   );

//   if (estadoRef) {
//     return {
//       title: `Tickets ${estadoRef.label} - Helpdesk Unity - Sistema de tickets`,
//       description: `Página de tickets ${estadoRef.label} en sistema de tickets Helpdesk Unity`,
//     };
//   }
// }

export default async function TicketsPorEstados({ params }) {
  const { idSector } = params;

  return (
    <>
      <HeaderListaTickets />
      <TraerTicketsDeSector idSector={idSector} />
    </>
  );
}
