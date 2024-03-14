"use client";

import { useContext, createContext, useState, useEffect } from "react";

const DesplegableContext = createContext();

const useDesplegable = () => {
  return useContext(DesplegableContext);
};

const DesplegableProvider = ({ children }) => {
  const [desplegar, setDesplegar] = useState(false);
  const [seleccion, cambiarSeleccion] = useState(false);
  const [seleccionUsuario, cambiarUsuario] = useState(false);
  const [seleccionPrioridad, cambiarSeleccionPrioridad] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1350) {
        setDesplegar(true);
      } else {
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
        seleccion,
        seleccionUsuario,
        seleccionPrioridad,
        setDesplegar,
        cambiarSeleccion,
        cambiarUsuario,
        cambiarSeleccionPrioridad,
      }}
    >
      {children}
    </DesplegableContext.Provider>
  );
};

export { useDesplegable, DesplegableProvider };
