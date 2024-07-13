import React from "react";
import { Notificacion } from "./Notificacion";
import { useNotificaciones } from "@/contexts/notificacionesContext";
import styles from "@/componentes/notificacion.module.css"

const NotificacionesContainer = () => {
  const { notificaciones } = useNotificaciones();

  return (
    <>
      {notificaciones && (
        <div className={`z-[999] flex flex-col-reverse max-h-screen overflow-y-auto p-4 ${styles.notificaciones}`}>
          {notificaciones
            .slice(0)
            .reverse()
            .map((notif) => (
              <Notificacion key={notif.id} notif={notif} />
            ))}
        </div>
      )}
    </>
  );
};

export default NotificacionesContainer;
