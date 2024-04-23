"use client";

import { BotonOpciones } from "./BotonOpciones";
import { useEffect, useState } from "react";
import { SeleccionarEstado } from "./SeleccionarEstado";
import { crearMovimientoTicket } from "../firebase/CrearMovimientoTicket";
import { useMovimientoTicket } from "@/contexts/movimientosContext";
import { actualizarTicket } from "@/firebase/ActualizarTicket";

const FormularioMovimientoTicket = ({ ticket }) => {
  const { campos, cambiarCampos } = useMovimientoTicket();

  useEffect(() => {
    if (ticket) {
      cambiarCampos((prevData) => ({
        ...prevData,
        idTicket: ticket.idTicket,
        idEstado: ticket.idEstado,
        legajoEmisor: ticket.legajoAsignado,
        descripcionMovimiento: "",
      }));
    }
  }, [ticket, cambiarCampos]);

  const [desplegar, setDesplegar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    cambiarCampos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (campos) {
      try {
        await crearMovimientoTicket(campos);
        await actualizarTicket(campos);
        cambiarCampos((prevData) => ({
          ...prevData,
          idTicket: ticket.idTicket,
          idEstado: ticket.idEstado,
          legajoEmisor: ticket.legajoAsignado,
          descripcionMovimiento: "",
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-[240px] w-[80%] flex items-center justify-center"
    >
      <div className="relative w-full h-full bg-white">
        <textarea
          id="mensajeMovimientoTicket"
          name="descripcionMovimiento"
          value={campos.descripcionMovimiento}
          onChange={handleChange}
          placeholder="Escriba un mensaje..."
          className="w-full bg-white h-[80%] py-2 px-4 m-auto outline-none resize-none border rounded-md rounded-b-none border-opacity-5 "
        />
        <label
          htmlFor="mensajeMovimientoTicket"
          className="absolute flex justify-between items-center rounded-b-md bg-neutral-800 bottom-0 right-0 p-2 w-[100%] min-h-11 h-[20%]"
        >
          <BotonOpciones />
          <div className="flex flex-row items-center gap-4">
            <span className="text-white font-semibold text-base">
              Nuevo Estado:
            </span>
            <SeleccionarEstado
              desplegar={desplegar}
              setDesplegar={setDesplegar}
              campos={campos}
              cambiarCampos={cambiarCampos}
            />
            <button
              type="submit"
              className="px-4 py-1 rounded-md bg-blue-700 hover:bg-blue-600 text-white border border-blue-700 font-semibold hover:shadow-4xl transition"
            >
              Enviar
            </button>
          </div>
        </label>
      </div>
    </form>
  );
};

export default FormularioMovimientoTicket;
