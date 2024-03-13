import FormularioCrearTicket from "../../../componentes/FormularioCrearTicket";

export const metadata = {
  title: "Crear Ticket - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para crear un ticket, en sistema de tickets Helpdesk Unity",
};

export default async function CrearTicket() {
  const usuarios = await fetch(`https://helpdeskunity.netlify.app/api/ticket/usuarios`,{
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataSector = await fetch(`https://helpdeskunity.netlify.app/api/ticket/sectores`,
  {
    cache: "force-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <>
      {usuarios && dataSector && (
        <FormularioCrearTicket
          usuarios={usuarios}
          dataSector={dataSector}
        />
      )}
    </>
  );
}
