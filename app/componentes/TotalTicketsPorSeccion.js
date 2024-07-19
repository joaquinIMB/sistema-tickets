import styles from "@/componentes/admin.module.css"

export const TotalTickets = ({ background ,cantidad }) => {
    return (
      <span className={`absolute top-[39%] right-[-11px] ${background} ${styles.totalTicket} min-w-8 h-4 text-xs text-white content-center text-center`}>
        {cantidad}
      </span>
    );
  }; 