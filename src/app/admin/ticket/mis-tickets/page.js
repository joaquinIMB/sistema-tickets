import { TraerTicketPorAsignado } from "@/app/componentes/TraerTicketPorAsignado";

export const metadata = {
  title: "Mis tickets a resolver - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para visualizar los tickets del usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function MisTickets() {
  const data = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket`, {
    cache: "no-store"
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataUsuario = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <>
      {data && dataUsuario && (
        <TraerTicketPorAsignado data={data} dataUsuario={dataUsuario} />
      )}
    </>
  );
}
