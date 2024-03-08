import FormularioRegistroUsuario from "@/app/componentes/FormularioRegistroUsuario";

export const metadata = {
  title: "Registrarse - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para registrar un usuario en sistema de tickets Helpdesk Unity",
};

export default async function RegistrarUsuario() {
  const dataSector = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket/sectores`,{
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return <FormularioRegistroUsuario dataSector={dataSector} />;
}
