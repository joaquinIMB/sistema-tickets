import BotonCerrarSesion from "@/componentes/BotonCerrarSesion";
import { BuscaRuta } from "@/componentes/BuscaRuta";
import styles from "@/componentes/admin.module.css";

export const Header = () => {
  return (
    <header
      className={`sticky flex top-0 z-[60] bg-[#f9f9f9] border-b border-opacity-5 border-black items-center px-12 py-4 text-white h-[8%] min-h-[70px] w-auto transition-[3s] ${styles.header}`}
    >
      <div className="flex items-center justify-between w-full ">
        <div className={`flex items-center transition-all`}>
          <BuscaRuta />
        </div>
        <BotonCerrarSesion />
      </div>
    </header>
  );
};