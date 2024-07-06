"use client";

import styles from "@/componentes/admin.module.css";
import { useGetSectorPorIdUsuarioQuery } from "@/services/apiTicket";
import { AsideDetalles } from "./AsideDetalles";
import { SeccionMovimientoTicket } from "./SeccionMovimientosTicket";

export const ContenedorSeccionMovimientoTicket = ({ idTicket, dataSector }) => {
  const { data } = useGetSectorPorIdUsuarioQuery("ST_usuarios");
  const dataUsuario = data;
  return (
    <>
      {data && (
        <div className={`${styles.contenedorMovTickets}`}>
          <SeccionMovimientoTicket
            idTicket={idTicket}
            dataUsuario={dataUsuario}
          />
          <AsideDetalles
            idTicket={idTicket}
            dataSector={dataSector}
            dataUsuario={dataUsuario}
          />
        </div>
      )}
    </>
  );
};
