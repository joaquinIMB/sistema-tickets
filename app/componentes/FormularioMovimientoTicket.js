"use client";

import { BotonOpciones } from "./BotonOpciones";
import { useState } from "react";
import { SeleccionarEstado } from "./SeleccionarEstado";
import { crearMovimientoTicket } from "../firebase/CrearMovimientoTicket";

const FormularioMovimientoTicket = ({ ticket }) => {
  const [desplegar, setDesplegar] = useState(false);
  const [campos, cambiarCampos] = useState({
    idTicket: ticket.idTicket,
    idSector: ticket.idSector,
    idEstado: ticket.idEstado,
    prioridad: ticket.prioridad,
    legajoEmisor: ticket.legajoAsignado,
    legajoAsignado: null,
    descripcionMovimiento: "",
  });

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
        cambiarCampos({
          idTicket: ticket.idTicket,
          idSector: ticket.idSector,
          idEstado: ticket.idEstado,
          prioridad: ticket.prioridad,
          legajoEmisor: ticket.legajoAsignado,
          legajoAsignado: null,
          descripcionMovimiento: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-[20%] w-[80%] flex items-center justify-center"
    >
      <div className="relative w-full h-full bg-white">
        <textarea
          id="mensajeMovimientoTicket"
          name="descripcionMovimiento"
          value={campos.descripcionMovimiento}
          onChange={handleChange}
          placeholder="Escriba un mensaje..."
          className="w-full bg-white h-[70%] py-2 px-4 m-auto outline-none resize-none border rounded-md rounded-b-none border-opacity-5 "
        />
        <label
          htmlFor="mensajeMovimientoTicket"
          className="absolute flex justify-between items-center rounded-b-md bg-neutral-800 bottom-0 right-0 p-2 w-[100%] min-h-11 h-[30%]"
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
              as={"button"}
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
