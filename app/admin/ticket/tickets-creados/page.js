import { Loader } from "@/elementos/Loader";
import { TraerTicketPorEmisor } from "@/componentes/TraerTicketPorEmisor";
import { apiUsuarios } from "@/routes/apiRoutes";
import { Suspense } from "react";

export const metadata = {
  title: "Tickets emitidos por mí - Helpdesk Unity - Sistema de tickets",
  description:
    "Página en donde veremos los tickets creados por el usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsCreados() {
  const dataUsuario = await fetch(`${apiUsuarios()}`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      <Suspense fallback={<Loader />}>
        <TraerTicketPorEmisor dataUsuario={dataUsuario} />
      </Suspense>
    </>
  );
}
