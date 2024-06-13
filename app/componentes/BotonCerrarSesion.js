"use client";

import Link from "next/link";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/navigation";

const BotonCerrarSesion = () => {
  const { cerrarSesion } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    cerrarSesion();
    router.push("/");
  };
  return (
    <Link
      onClick={handleClick}
      href={"/"}
      className={
        "inline-flex h-10 items-center rounded-md justify-center bg-red-600 p-4 text-base font-medium shadow transition-colors hover:bg-red-500 "
      }
    >
      Cerrar Sesión
    </Link>
  );
};

export default BotonCerrarSesion;
