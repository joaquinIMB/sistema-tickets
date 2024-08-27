import Image from "next/image";
import { useState, useEffect } from "react";
import { ModalResultadoBusqueda } from "./ModalResultadoBusqueda";
import { useExecuteStoredProcedureQuery } from "@/services/apiTicket";
import { skipToken } from "@reduxjs/toolkit/query";

export const BarraBusqueda = ({ idSector, idUsuario }) => {
  const [parametros, setParametros] = useState({
    cadena: "",
    idSector: idSector,
    idUsuario:idUsuario
  });
  const [modalBusqueda, setModalBusqueda] = useState(false);
  const [shouldExecuteQuery, setShouldExecuteQuery] = useState(false);
  const { data, isLoading } = useExecuteStoredProcedureQuery(
    shouldExecuteQuery ? parametros : skipToken // RTK Query skip functionality
  );

  const handleChange = (e) => {
    setParametros((prevParametros) => ({
      ...prevParametros,
      cadena: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parametros.cadena && parametros.idSector) {
      setShouldExecuteQuery(true);
      setModalBusqueda(true);
    }
  };

  useEffect(() => {
    if (!modalBusqueda) {
      setShouldExecuteQuery(false);
    }
  }, [modalBusqueda]);

  return (
    <div className="min-h-[54px] p-2 pb-1">
      <form
        className="flex flex-row max-w-xl items-center rounded-md overflow-hidden max-md:border-none border border-black border-opacity-5"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-1 outline-0 p-2 pl-3 bg-white text-zinc-800 max-md:w-[180px]"
          placeholder="Buscar tickets"
          name="cadena"
          value={parametros.cadena}
          onChange={handleChange}
        />
        <button className="px-2 bg-[#f0f0f0] h-10" type="submit">
          <Image
            className="w-[20px]"
            src="/lupa.png"
            alt="Logo de busqueda"
            width={100}
            height={100}
          />
        </button>
      </form>
      {modalBusqueda && !isLoading && (
        <ModalResultadoBusqueda
          setModalBusqueda={setModalBusqueda}
          data={data}
        />
      )}
    </div>
  );
};
