import FormularioRegistroUsuario from "@/componentes/FormularioRegistroUsuario";
import { apiSectores } from "@/routes/apiRoutes";

export const metadata = {
  title: "Registrarse - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para registrar un usuario en sistema de tickets Helpdesk Unity",
};

export default async function RegistrarUsuario() {
  const dataSector = await fetch(`${apiSectores()}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const dataUsuarios = await fetch(
    `http://localhost:3000/api/ticket/usuarios`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return (
    <FormularioRegistroUsuario
      dataSector={dataSector}
      dataUsuarios={dataUsuarios}
    />
  );
}
