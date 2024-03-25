import { Loader } from "@/componentes/Loader";
import { TraerTicketPorEstado } from "@/componentes/TraerTicketPorEstado";
import { listaEstados } from "@/componentes/listaEnlaces";
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
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://helpdeskunity.netlify.app/api/ticket"
      : "http://127.0.0.1:3000/api/ticket";

  const { estado } = params;
  const data = await fetch(`${API_URL}/${estado}`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
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
