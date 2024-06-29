import { Error } from "@/componentes/Error";
import { TicketSinAbrirPorSector } from "@/componentes/TicketSinAbrirPorSector";

export const metadata = {
  title: "Tickets nuevos de mi sector - Helpdesk Unity - Sistema de tickets",
  description:
    "Tickets nuevos en sector asignado a usuario, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsSinAbrir() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataSector = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sectores`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <TicketSinAbrirPorSector
      dataSector={dataSector}
      dataUsuario={dataUsuario}
    />
  );
}
