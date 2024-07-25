import styles from "@/componentes/admin.module.css"

export const TotalTickets = ({ background ,cantidad }) => {
    return (
      <span className={`absolute top-[36%] right-0 ${background} ${styles.totalTicket} min-w-8 h-4 text-xs text-neutral-800 font-bold content-center text-center`}>
        {cantidad}
      </span>
    );
  }; 