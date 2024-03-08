import { Loader } from "@/app/componentes/Loader";
import { TraerTicketPorEmisor } from "@/app/componentes/TraerTicketPorEmisor";
import { Suspense } from "react";

export const metadata = {
  title: "Tickets emitidos por mí - Helpdesk Unity - Sistema de tickets",
  description:
    "Página en donde veremos los tickets creados por el usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsCreados() {
  const data = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket`, {
    cache:"no-cache" 
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataUsuario = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket/usuarios`, {
     cache:"no-cache"
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      {data && dataUsuario && (
        <Suspense fallback={<Loader />}>
          <TraerTicketPorEmisor data={data} dataUsuario={dataUsuario} />
        </Suspense>
      )}
    </>
  );
}
