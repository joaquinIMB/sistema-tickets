"use client";

import Link from "next/link";
import { useAuth } from "../contexts/authContext";

const BotonCerrarSesion = () => {
  const { cerrarSesion } = useAuth();
  return (
    <Link
      onClick={cerrarSesion}
      href={"/"}
      className={
        "inline-flex h-10 items-center justify-center bg-red-600 p-4 text-base font-medium shadow transition-colors hover:bg-red-500 "
      }
    >
      Cerrar Sesión
    </Link>
  );
};

export default BotonCerrarSesion;
