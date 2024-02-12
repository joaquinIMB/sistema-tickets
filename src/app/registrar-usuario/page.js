import FormularioRegistroUsuario from "@/app/componentes/FormularioRegistroUsuario";

export const metadata = {
  title: "Helpdesk Unity - Registrar Usuario",
  description:
    "Helpdesk Unity es una aplicación web que le permite a su empresa gestionar tareas y realizar seguimiento de las mismas",
};

export default function RegistrarUsuario() {
  return (
    <div className="flex justify-center items-center h-screen">
      <main className="flex flex-col items-center">
        <FormularioRegistroUsuario />
      </main>
    </div>
  );
}
