"use client";

import { useEffect } from "react";
import styles from "@/componentes/offcanvas.module.css";
import Image from "next/image";

const Offcanvas = ({ handleClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  return (
    <div className={styles.offcanvasBackdrop} onClick={handleClose}>
      <div className={styles.offcanvas} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className={styles.closeButton}>
          <Image
            src={"/cerrar.png"}
            alt="Botón para cerrar menú lateral"
            width={40}
            height={40}
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Offcanvas;
