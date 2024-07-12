"use client";

import { useNotificaciones } from "@/contexts/notificacionesContext";
import { useUpdateNotificacionLeidaMutation } from "@/services/apiTicket";
import styles from "@/componentes/notificacion.module.css"

export const Notificacion = ({ notif }) => {
  const { notificaciones, setNotificaciones } = useNotificaciones();
  const [marcarComoLeida] = useUpdateNotificacionLeidaMutation();

  const marcarLeido = (id) => {
    marcarComoLeida(id);
    setNotificaciones(notificaciones.filter((notif) => notif.id !== id));
  };

  return (
    <div className={`flex items-start bg-white border rounded shadow-lg p-4 max-w-sm w-full mx-auto mb-4 ${styles.notificacion}`}>
      <div className="flex-shrink-0">
        <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white"></div>
      </div>
      <div className="ml-3 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900 font-semibold">Nuevo mensaje</h3>
          <span className="text-gray-400 text-sm">{notif.fechaHora}</span>
        </div>
        <div className="text-gray-700 mt-1">{notif.mensaje}</div>
      </div>
      <button
        className="ml-3 text-gray-400 hover:text-gray-500"
        onClick={() => marcarLeido(notif.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
