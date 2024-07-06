import FormularioCrearTicket from "@/componentes/FormularioCrearTicket";
import { SkeletonFormularioCrearTicket } from "@/elementos/skeletons/SkeletonFormCrearTicket";
import { Suspense } from "react";

export const metadata = {
  title: "Crear Ticket - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para crear un ticket, en sistema de tickets Helpdesk Unity",
};

export default async function CrearTicket() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataSector = await fetch(`${API_URL}/sectores`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <Suspense fallback={<SkeletonFormularioCrearTicket />}>
      <FormularioCrearTicket
        dataUsuario={dataUsuario}
        dataSector={dataSector}
      />
    </Suspense>
  );
}
