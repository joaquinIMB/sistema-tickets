"use client";

import { useEffect } from "react";
import styles from "@/componentes/offcanvas.module.css";

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
        {children}
      </div>
    </div>
  );
};

export default Offcanvas;
