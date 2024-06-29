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

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      <HeaderListaTickets />
      {dataUsuario && (
        <TraerTicketPorEstado idEstado={idEstado} dataUsuario={dataUsuario} />
      )}
    </>
  );
}
