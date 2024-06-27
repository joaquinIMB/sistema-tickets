"use client";

import { BotonOpciones } from "@/elementos/BotonOpciones";
import { useEffect, useState } from "react";
import { SeleccionarEstado } from "./SeleccionarEstado";
import {
  useCreateMovimientoTicketMutation,
  useGetMovimientoTicketQuery,
  useUpdateTicketMutation,
} from "@/services/apiTicket";
import { useMovimientoTicket } from "@/contexts/movimientosContext";
import Alerta from "./Alerta";
import { traerFechaHora } from "@/funciones/traerFechaHora";

const FormularioMovimientoTicket = ({ ticket, usuarioEmisor }) => {
  const { campos, cambiarCampos } = useMovimientoTicket();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const [desplegar, setDesplegar] = useState(false);
  const [crearMovimientoTicket] = useCreateMovimientoTicketMutation();
  const [actualizarTicket] = useUpdateTicketMutation();
  const { data, error } = useGetMovimientoTicketQuery(ticket.idTicket);

  useEffect(() => {
    if (ticket) {
      cambiarCampos({
        idTicket: ticket.idTicket,
        idSector: ticket.idSector,
        idEstado: ticket.idEstado,
        prioridad: ticket.prioridad,
        legajoEmisor: ticket.legajoAsignado,
        legajoAsignado: ticket.legajoAsignado,
        nombreUsuarioAsignado: ticket.nombreUsuarioAsignado,
        descripcionMovimiento: "",
      });
    }
  }, [ticket, cambiarCampos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    cambiarCampos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validarCampos = () => {
    const camposVacios = Object.values(campos).some(
      (valor) => valor.descripcionMovimiento === ""
    );
    if (camposVacios) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaHora = traerFechaHora();
    const idMovimientoTicket = data ? data.length + 1 : 1;
    if (usuarioEmisor.idUsuario == ticket.legajoEmisor.trim()) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `Usted creó el ticket, no puede realizar cambios en el mismo`,
      });
      return;
    }
    if (validarCampos) {
      cambiarCampos((prevData) => ({
        ...prevData,
        fechaHoraRegistro: fechaHora,
        idMovimientoTicket: idMovimientoTicket,
      }));
    }
    if(campos.idEstado === "resuelto"){
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `El ticket actual está resuelto`,
      });
      return
    }
    if (campos) {
      try {
        await crearMovimientoTicket(campos);
        await actualizarTicket(campos);
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "aceptado",
          mensaje: `¡El movimiento de ticket se creó correctamente!`,
        });
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
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-[148px] w-[90%] flex items-center justify-center"
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
            className="absolute flex justify-end items-center rounded-b-md bg-neutral-800 bottom-0 right-0 p-2 w-[100%] min-h-11 h-[20%]"
          >
            {/* <BotonOpciones /> */}
            <div className="flex flex-row items-center gap-4">
              <span className="text-white font-semibold text-base">
                Estado:
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
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
};

export default FormularioMovimientoTicket;
