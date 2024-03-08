import Link from "next/link";
import { colorEstado } from "./colores";
import styles from "@/app/componentes/admin.module.css";
import { useAperturaTicket } from "../contexts/aperturaTicketContext";
import { useAuth } from "../contexts/authContext";
import { usePathname } from "next/navigation";

export const Ticket = ({ ticket }) => {
  const { usuario } = useAuth();
  const { setData, obtenerUsuario } = useAperturaTicket();
  const pathname = usePathname();
  const colorActual = colorEstado.find(
    (color) => color.estado === ticket.idEstado
  );

  const handleClick = async () => {
    try {
      if (
        pathname !== "/admin/ticket/tickets-creados" &&
        ticket.idEstado === "nuevo"
      ) {
        const dataUsuario = await fetch(
          `https://unity-1bc4d.firebaseapp.com/api/ticket/usuarios`,
          {
            cache: "no-store",
          }
        );

        if (!dataUsuario.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const usuarioActual = await dataUsuario.json();

        const user = usuarioActual.find(
          (user) => user.correo === usuario.email
        );

        if (!user) {
          throw new Error("No se encontró un usuario válido");
        }

        await obtenerUsuario(user);
        await setData({ ...ticket });

      } else {
        return;
      }
    } catch (error) {
      console.error("Error en handleClick:", error.message);
    }
  };

  return (
    <>
      {ticket && (
        <Link
          onClick={handleClick}
          className="w-full relative"
          href={`/admin/ticket/movimientos-ticket/${ticket.idTicket}`}
        >
          <ul
            className={`flex flex-row px-12 justify-between text-[#161616] list-none bg-white border-b-2 border-opacity-5 h-[74px] hover:bg-[#f0f0f0] items-center  border-black ${styles.listaTicket}`}
          >
            <li className={`w-[25%] ${styles.usuario}`}>
              <h1 className="font-semibold text-lg"> {ticket.nombreEmisor}</h1>
              <span className={`text-gray-600 ${styles.correo}`}>
                {ticket.correoUsuarioEmisor}
              </span>
            </li>
            <li className={`w-[35%] text-center font-semibold overflow-hidden ${styles.motivo}`}>
              {ticket.tituloTicket}
            </li>
            <li className={`w-[10%] text-center font-semibold ${styles.prioridad}`}>
              {ticket.prioridad}
            </li>
            <li className={`w-[12%] capitalize text-center ${styles.estado}`}>
              <span
                className={`${colorActual.bg}
            ${
              ticket.idEstado === "resuelto" ? "text-black" : "text-white"
            } py-1 px-2 rounded-full align-middle`}
              >
                {ticket.idEstado === "proceso" ? "En proceso" : ticket.idEstado}
              </span>
            </li>
            <li className={`w-[18%] text-end font-semibold text-gray-600 ${styles.fecha}`}>
              {ticket.fechaHoraRegistro}
            </li>
          </ul>
        </Link>
      )}
    </>
  );
};
 