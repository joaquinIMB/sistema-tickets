import styles from "@/componentes/admin.module.css";

export const HeaderListaTickets = () => {
  return (
    <ul
      className={`flex uppercase justify-between flex-row shadow-3xl text-slate-500 px-12 w-full text-lg font-medium list-none bg-[#ffffff94] backdrop-blur-sm sticky top-0 z-10 py-3.5 items-center ${styles.headerListaTicket}`}
    >
      <li className={`w-[25%] ${styles.usuario}`}>Usuario</li>
      <li className={`w-[35%] text-center ${styles.motivo}`}>Motivo</li>
      <li className={`w-[10%] text-center ${styles.prioridad}`}>Prioridad</li>
      <li className={`w-[12%] text-center ${styles.estado}`}>Estado</li>
      <li className={`w-[18%] text-end ${styles.fecha}`}>Fecha de creación</li>
    </ul>
  );
};
