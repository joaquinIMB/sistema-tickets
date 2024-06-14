import FormularioIniciarSesion from "@/componentes/FormularioInicioSesion";

export const metadata = {
  title: "Iniciar Sesión - Helpdesk Unity - Sistema de tickets",
  description: "Página para iniciar sesión a sistema de tickets Helpdesk Unity",
};

export default async function IniciarSesion() {
  const dataUsuarios = await fetch(
    `http://localhost:3000/api/ticket/usuarios`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return <FormularioIniciarSesion dataUsuarios={dataUsuarios} />;
}
