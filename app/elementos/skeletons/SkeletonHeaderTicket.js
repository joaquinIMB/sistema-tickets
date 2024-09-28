import styles from "@/elementos/skeletons/skeleton.module.css";
import style from "@/componentes/admin.module.css";

export const SkeletonHeaderListaTicket = () => {
  return (
    <ul
      className={`flex uppercase gap-4 justify-between flex-row shadow-3xl text-slate-500 px-12 w-full text-lg font-medium list-none bg-[#ffffff94] backdrop-blur-sm sticky top-0 z-10 py-3.5 items-center transition-[3s] ${styles.headerListaTicket}`}
    >
      <li className={`w-[25%] ${style.usuario}`}>
        <div
          className={`h-6 bg-gray-300 w-20 rounded-md ${styles.animatePulse}`}
        ></div>
      </li>
      <li className={`w-[30%] text-left py-0 px-4 ${style.motivo}`}>
        <div
          className={`h-6 bg-gray-300 w-20 rounded-md ${styles.animatePulse} mx-auto`}
        ></div>
      </li>
      <li className={`w-[10%] text-center ${style.prioridad}`}>
        <div
          className={`h-6 bg-gray-300 w-26 rounded-md ${styles.animatePulse} mx-auto`}
        ></div>
      </li>
      <li className={`w-[12%] text-center ${style.estado}`}>
        <div
          className={`h-6 bg-gray-300 w-20 rounded-md ${styles.animatePulse} mx-auto`}
        ></div>
      </li>
      <li className={`w-[18%] text-end max-sm:hidden ${style.fecha}`}>
        <div
          className={`h-6 bg-gray-300 w-[80%] rounded-md ${styles.animatePulse} ml-auto`}
        ></div>
      </li>
    </ul>
  );
};
