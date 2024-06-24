"use client";

import { useContext, createContext, useState, useEffect } from "react";

const DesplegableContext = createContext();

const useDesplegable = () => {
  return useContext(DesplegableContext);
};

const DesplegableProvider = ({ children }) => {
  const [desplegar, setDesplegar] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1028) {
        setDesplegar(false);
      }
    };

    // Agregar el event listener para escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    handleResize();

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setDesplegar]);

  return (
    <DesplegableContext.Provider
      value={{
        desplegar,
        setDesplegar,
      }}
    >
      {children}
    </DesplegableContext.Provider>
  );
};

export { useDesplegable, DesplegableProvider };
