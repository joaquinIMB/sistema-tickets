"use client";

import { useEffect, useState } from "react";
import { SeleccionarEstado } from "./SeleccionarEstado";
import {
  useCreateMovimientoTicketMutation,
  useCreateNotificacionTicketMutation,
  useGetMovimientoTicketQuery,
  useUpdateTicketMutation,
} from "@/services/apiTicket";
import { useMovimientoTicket } from "@/contexts/movimientosContext";
import Alerta from "./Alerta";
// import { useRouter } from "next/navigation";
import { traerFechaHora } from "@/funciones/traerFechaHora";

const FormularioMovimientoTicket = ({ ticket, usuarioEmisor }) => {
  const { campos, cambiarCampos } = useMovimientoTicket();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const [desplegar, setDesplegar] = useState(false);
  const [crearMovimientoTicket] = useCreateMovimientoTicketMutation();
  const [actualizarTicket] = useUpdateTicketMutation();
  const [crearNotificacion] = useCreateNotificacionTicketMutation();
  const { data, error } = useGetMovimientoTicketQuery(ticket.idTicket);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (ticket) {
      cambiarCampos({
        idTicket: ticket.idTicket,
        idSector: ticket.idSector,
        idEstado: ticket.idEstado,
        prioridad: ticket.prioridad,
        legajoEmisor: usuarioEmisor.idUsuario,
        legajoAsignado: ticket.legajoAsignado,
        nombreUsuarioAsignado: ticket.nombreUsuarioAsignado,
        descripcionMovimiento: "",
      });
    }
  }, [ticket, cambiarCampos, usuarioEmisor.idUsuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    cambiarCampos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // SI DETECTA CAMPOS VACIOS NO PERMITE CREAR UN TICKET
  // const validarCampos = () => {
  //   const camposVacios = Object.values(campos).some(
  //     (valor) => valor.descripcionMovimiento === ""
  //   );
  //   if (camposVacios) {
  //     cambiarEstadoAlerta(true);
  //     cambiarAlerta({
  //       tipo: "error",
  //       mensaje: "Por favor rellena todos los campos",
  //     });
  //     return true;
  //   }
  //   return false;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [ultimoMov] = data.filter(
      (movimiento) =>
        movimiento.idMovimientoTicket === data.length && movimiento
    );
    // SI EL SECTOR DEL USUARIO DEL ULTIMO MOVIMIENTO ES DISTINTO AL SECTOR DEL USUARIO ACTUAL NO LO DEJA INTERACTUAR CON EL TICKET

    // if (ultimoMov.idSector != usuarioEmisor.idSector) {
    //   cambiarEstadoAlerta(true);
    //   cambiarAlerta({
    //     tipo: "error",
    //     mensaje: `No podes interactuar con el ticket`,
    //   });
    //   return;
    // }
    if (
      (ticket.legajoEmisor === usuarioEmisor.idUsuario &&
        ticket.idEstado != campos.idEstado) ||
      (ticket.legajoEmisor === usuarioEmisor.idUsuario &&
        ticket.prioridad != campos.prioridad) ||
      (ticket.legajoEmisor === usuarioEmisor.idUsuario &&
        ticket.legajoAsignado != campos.legajoAsignado)
    ) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `No puede cambiar el estado, prioridad o responsable del ticket`,
      });
      return;
    }
    if (
      Number(usuarioEmisor.idUsuario) === ultimoMov.legajoEmisor &&
      ticket.idEstado === "nuevo"
    ) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `No puede realizar cambios en un ticket que aún no está abierto`,
      });
      return;
    }
    if (ticket.idEstado === "resuelto" || ticket.idEstado === "anulado") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `El ticket actual está ${ticket.idEstado}`,
      });
      return;
    }
    if (campos.descripcionMovimiento === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `Debe ingresar una descripción al movimiento`,
      });
      return;
    }
    if (
      ultimoMov.idEstado === "nuevo" &&
      ultimoMov.legajoAsignado === "Todos"
    ) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `El ticket aún no está abierto`,
      });
      return;
    }
    setIsSubmitting(true);
    if (campos) {
      try {
        const fechaHora = traerFechaHora();
        const idMovimientoTicket = data ? data.length + 1 : 1;
        await crearMovimientoTicket({
          ...campos,
          idMovimientoTicket: idMovimientoTicket,
          fechaHoraRegistro: fechaHora,
        });
        await actualizarTicket({
          ...campos,
          nombreUsuarioAsignado:
            campos.legajoAsignado === "Todos"
              ? "Todos"
              : campos.nombreUsuarioAsignado,
        });
        await crearNotificacion({
          ...campos,
          idUsuario: ticket.legajoEmisor,
          idSector: campos.idSector,
          mensaje: `${usuarioEmisor.nombreUsuario} realizó un cambio en el ticket ${campos.idTicket}`,
          fechaHoraRegistro: fechaHora,
          idTicket: campos.idTicket,
          idMovimientoTicket: idMovimientoTicket,
        });
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "aceptado",
          mensaje: `¡El movimiento de ticket se creó correctamente!`,
        });
        cambiarCampos((prevData) => ({
          ...prevData,
          idTicket: ticket.idTicket,
          idEstado: ticket.idEstado,
          legajoEmisor: campos.legajoEmisor,
          descripcionMovimiento: "",
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-[148px] w-[95%] flex items-center justify-center"
      >
        <div className="relative w-full h-full bg-white">
          <textarea
            id="mensajeMovimientoTicket"
            name="descripcionMovimiento"
            value={campos.descripcionMovimiento}
            onChange={handleChange}
            placeholder="Escriba un mensaje..."
            className="w-full bg-white h-[72%] py-2 px-4 m-auto outline-none resize-none border rounded-md rounded-b-none border-opacity-5 "
          />
          <label
            htmlFor="mensajeMovimientoTicket"
            className="absolute flex justify-end items-center rounded-b-md bg-neutral-800 bottom-0 right-0 p-2 w-[100%] min-h-11 h-[20%]  z-[99]"
          >
            {/* <BotonOpciones /> */}
            <div className="flex flex-row items-center gap-4 ">
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
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
