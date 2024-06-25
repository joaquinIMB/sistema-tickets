"use client";

import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/navigation";

const BotonCerrarSesion = () => {
  const { cerrarSesion } = useAuth();
  const router = useRouter()
  const handleClick = () => {
    cerrarSesion();
    router.replace('/auth/iniciar-sesion')
  };
  return (
    <li
      onClick={handleClick}
      href={"/"}
      className={
        "cursor-pointer inline-flex h-10 items-center justify-start text-red-600 text-base font-medium transition-colors w-[90%] border-t border-opacity-5 border-black pt-5 mt-3 ml-1 pb-2 px-4 pl-1"
      }
    >
      Cerrar Sesión
    </li>
  );
};

export default BotonCerrarSesion;
