import { Loader } from "@/componentes/Loader";
import { TraerTicketPorEmisor } from "@/componentes/TraerTicketPorEmisor";
import { Suspense } from "react";

export const metadata = {
  title: "Tickets emitidos por mí - Helpdesk Unity - Sistema de tickets",
  description:
    "Página en donde veremos los tickets creados por el usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsCreados() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://helpdeskunity.netlify.app/api/ticket"
      : "http://127.0.0.1:3000/api/ticket";

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
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
