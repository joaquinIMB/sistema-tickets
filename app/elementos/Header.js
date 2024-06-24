'use client'

import { BuscaRuta } from "@/componentes/BuscaRuta";
import styles from "@/componentes/admin.module.css";
import BotonMenu from "./BotonMenu";
import BotonCrearTicket from "@/componentes/BotonCrearTicket";
import { useState, useEffect } from "react";

export const Header = () => {
  const [habilitarBoton, setHabilitarBoton] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setHabilitarBoton(true);
      }else{
        setHabilitarBoton(false)
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setHabilitarBoton]);
  return (
    <header
      className={`sticky flex top-0 z-[60] bg-[#f9f9f9] border-b border-opacity-5 border-black items-center px-12 py-2 text-white h-[8%] min-h-[60px] w-auto transition-[3s] ${styles.header}`}
    >
      <div className={`flex items-center justify-center w-full`}>
        <BotonMenu />
        <div className={`flex items-end transition-all max-sm:hidden`}>
          <BuscaRuta />
        </div>
        {habilitarBoton && <BotonCrearTicket habilitarBoton={habilitarBoton}/>}
      </div>
    </header>
  );
};
