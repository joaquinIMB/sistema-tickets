"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="container m-auto">
      <h1>Algo salió mal</h1>
      <h2>Error: {error}</h2>
      <button
        onClick={reset}
        className="bg-blue-600 text-white text-sm hover:bg-blue-500 cursor-pointer transition-all flex items-center justify-center gap-1 w-32 py-1 max-h-10"
      >
        Reintentar
      </button>
      <button className="bg-white text-blue-600 text-sm hover:bg-gray-300 cursor-pointer transition-all flex items-center justify-center gap-1 w-32 py-1 max-h-10">
        Volver al inicio
      </button>
    </div>
  );
}
