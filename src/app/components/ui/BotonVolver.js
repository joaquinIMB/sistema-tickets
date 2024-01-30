"use client";

import Link from "next/link";

const BotonVolver = () => {

  return (
    <Link href={"/"}
      className={
        "inline-flex h-8 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium shadow transition-colors hover:bg-red-500 "
      }
    >Cerrar Sesión</Link>
  );
};

export default BotonVolver;
