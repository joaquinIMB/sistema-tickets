import { Loader } from "@/elementos/Loader";
import { TraerTicketPorEstado } from "@/componentes/TraerTicketPorEstado";
import { listaEstados } from "@/elementos/listaEnlaces";
import { API_URL, apiUsuarios } from "@/routes/apiRoutes";
import { Suspense } from "react";

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
  const { estado } = params;
  const data = await fetch(`${API_URL}/${estado}`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  const dataUsuario = await fetch(`${apiUsuarios()}`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      {data && dataUsuario && (
        <Suspense fallback={<Loader />}>
          <TraerTicketPorEstado data={data} dataUsuario={dataUsuario} />
        </Suspense>
      )}
    </>
  );
}
