import { Loader } from "../../../componentes/Loader";
import { TraerTicketPorAsignado } from "../../../componentes/TraerTicketPorAsignado";
import { listaEstados } from "../../../componentes/listaEnlaces";
import { Suspense } from "react";

export function generateMetadata({ params, searchParams }, parent) {
  const { estado } = params;

  const estadoRef = listaEstados.find(
    (enlace) => enlace.estado === estado && enlace
  );

  return {
    title: `Tickets ${estadoRef.label} - Helpdesk Unity - Sistema de tickets`,
    description: `Página de tickets ${estadoRef.label} en sistema de tickets Helpdesk Unity`,
  };
}

export default async function TicketsPorEstados({ params }) {
  const { estado } = params;
  const data = await fetch(`https://helpdeskunity.netlify.app/api/ticket/${estado}`, {
    cache: "no-store" 
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  const dataUsuario = await fetch(`https://helpdeskunity.netlify.app/api/ticket/usuarios`, {
    cache: "no-store"
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      {data && dataUsuario && (
        <Suspense fallback={<Loader />}>
          <TraerTicketPorAsignado data={data} dataUsuario={dataUsuario} />
        </Suspense>
      )}
    </>
  );
}
