import { TraerTicketPorEstado } from "@/componentes/TraerTicketPorEstado";
import { listaEstados } from "@/elementos/listaEnlaces";
import { apiUsuarios } from "@/routes/apiRoutes";

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

  const dataUsuario = await fetch(`${apiUsuarios()}`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      {dataUsuario && (
        <TraerTicketPorEstado idEstado={idEstado} dataUsuario={dataUsuario} />
      )}
    </>
  );
}
