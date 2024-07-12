import React from "react";
import { Notificacion } from "./Notificacion";
import { useNotificaciones } from "@/contexts/notificacionesContext";

const NotificacionesContainer = () => {
  const { notificaciones } = useNotificaciones();

  return (
    <>
      {notificaciones && (
        <div className="fixed bottom-0 right-4 z-[999] flex flex-col-reverse max-h-screen overflow-y-auto p-4">
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
