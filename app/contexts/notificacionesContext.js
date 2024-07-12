"use client";

import { useContext, createContext, useMemo, useState, useEffect } from "react";
import { useAuth } from "./authContext";
import {
  useGetNotificacionPorSectorQuery,
  useGetNotificacionPorUsuarioQuery,
} from "@/services/apiTicket";

const NotificacionContext = createContext();

const useNotificaciones = () => {
  return useContext(NotificacionContext);
};

function NotificacionesProvider({ children }) {
  const { usuario } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);

  const {
    data: notificacionesPorSector,
    refetch: refetchNotificacionesPorSector,
  } = useGetNotificacionPorSectorQuery(usuario.idSector);
  const {
    data: notificacionesPorUsuario,
    refetch: refetchNotificacionesPorUsuario,
  } = useGetNotificacionPorUsuarioQuery(usuario.legajo);

  useMemo(() => {
    if (notificacionesPorSector && notificacionesPorUsuario && usuario.legajo) {
      const notificacionesPorSectorFiltradas = notificacionesPorSector.filter(
        (notif) => notif.idUsuarioEmisor != usuario.legajo
      );
      setNotificaciones((prevNotificaciones) => {
        const nuevasNotificaciones = [
          ...(notificacionesPorSectorFiltradas || []),
          ...(notificacionesPorUsuario || []),
        ];

        // Filtrar notificaciones duplicadas
        const notificacionesUnicas = nuevasNotificaciones.filter(
          (notif) =>
            !prevNotificaciones.some((prevNotif) => prevNotif.id === notif.id)
        );

        return [...prevNotificaciones, ...notificacionesUnicas];
      });
    }
  }, [notificacionesPorSector, notificacionesPorUsuario, usuario.legajo]);
  useEffect(() => {
    const interval = setInterval(() => {
      refetchNotificacionesPorSector();
      refetchNotificacionesPorUsuario();
    }, 10000);
    return () => clearInterval(interval);
  });

  return (
    <NotificacionContext.Provider value={{ notificaciones, setNotificaciones }}>
      {children}
    </NotificacionContext.Provider>
  );
}

export { useNotificaciones, NotificacionesProvider };
