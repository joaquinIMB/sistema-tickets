import FormularioRegistroUsuario from "@/componentes/FormularioRegistroUsuario";

export const metadata = {
  title: "Registrarse - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para registrar un usuario en sistema de tickets Helpdesk Unity",
};

export default async function RegistrarUsuario() {
  const dataSector = await fetch(`https://helpdeskunity.netlify.app/api/ticket/sectores`,{
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return <FormularioRegistroUsuario dataSector={dataSector} />;
}
