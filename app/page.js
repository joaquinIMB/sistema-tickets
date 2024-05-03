import FormularioIniciarSesion from "@/componentes/FormularioInicioSesion";
import { testDatabaseConnection } from "./sql/testConecction";

export const metadata = {
  title: "Iniciar Sesión - Helpdesk Unity - Sistema de tickets",
  description: "Página para iniciar sesión a sistema de tickets Helpdesk Unity",
};

export default function IniciarSesion() {
  // testDatabaseConnection()
  return (
    <div className="flex justify-center items-center py-2 min-h-screen">
      <main className={`flex flex-col items-center`}>
        <FormularioIniciarSesion />
      </main>
    </div>
  );
}
// return (
//   <>
//     <div className="flex flex-col min-h-screen">
//       <header className="flex items-center justify-between px-12 py-3 pt-4 border-b-2 border-black border-opacity-5 text-white">
//         <Link className="flex items-center gap-2" href="/">
//           <span
//             className={`text-2xl font-semibold text-gray-800 ${lobster.className} tracking-wider`}
//           >
//             HelpdeskUnity
//           </span>
//         </Link>
//         <div className="flex items-center gap-6">
//           <Link
//             className="inline-flex h-8 items-center justify-center bg-blue-700 p-5 text-base font-medium shadow transition-colors border border-blue-600 hover:bg-blue-600 "
//             href="/auth/iniciar-sesion"
//           >
//             Iniciar Sesion
//           </Link>
//           <Link
//             className="inline-flex h-8 items-center justify-center hover:border-gray-700 hover:text-gray-700 border border-black text-black p-5 text-base font-medium shadow transition-color"
//             href="/auth/registrar-usuario"
//           >
//             Registrarse
//           </Link>
//         </div>
//       </header>
//       <main className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
//         <h1
//           className={`text-6xl font-semibold sm:text-7xl md:text-[4.75rem] xl:text-8xl tracking-tight`}
//         >
//           Bienvenido a
//           <span
//             className={`text-6xl font-semibold sm:text-7xl md:text-[4.75rem] xl:text-8xl tracking-tighter `}
//           >
//             {" "}
//             Helpdesk Unity
//           </span>
//         </h1>
//         <p
//           className={`max-w-[1000px] text-gray-500 md:text-xl/9 lg:text-xl/10 xl:text-2xl/relaxed dark:text-gray-400 mt-3 ${poppins.className}`}
//         >
//           Tu plataforma centralizada para resolver problemas y recibir
//           asistencia técnica.
//         </p>
//       </main>
//       <footer className="flex items-center justify-center py-4 border-t-2 border-black border-opacity-5 text-black">
//         <p className="text-sm">
//           © 2024 Helpdesk Unity. Todos los derechos reservados.
//         </p>
//       </footer>
//     </div>
//   </>
// );
