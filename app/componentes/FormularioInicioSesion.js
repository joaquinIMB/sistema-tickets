"use client";

import { useState } from "react";
import Alerta from "./Alerta";
import { useAuth } from "../contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormularioIniciarSesion = () => {
  const router = useRouter();
  const [campos, establecerCampos] = useState({
    correo: "",
    contraseña: "",
  });
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { iniciarSesion } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    establecerCampos((prevCampos) => ({
      ...prevCampos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(campos.correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa un correo válido",
      });
      return;
    }
    if (campos.correo === "" || campos.contraseña === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
      return;
    }
    try {
      await iniciarSesion(campos);
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "aceptado",
        mensaje: `¡Bienvenidx de vuelta!`,
      });
      router.replace("/admin/ticket/tickets-sin-abrir");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "La contraseña no es correcta",
          });
          break;
        case "auth/user-not-found":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "No se encontró ningun usuario con estos datos",
          });
          break;
        default:
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "Hubo un error al intentar iniciar sesion",
          });
          break;
      }
    }
  };

  return (
    <div className="container p-4 pb-2 pt-0">
      <h1 className="text-base font-bold w-full pt-4 pb-2 text-gray-600">
        Inicia sesión en tu cuenta de Helpdesk Unity
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto w-full bg-white rounded-md pt-2"
      >
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-base font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="correo"
            placeholder="Correo electrónico"
            value={campos.correo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-black outline-none"
            required
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="contraseña"
            placeholder="Ingresá tu contraseña"
            value={campos.contraseña}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-black outline-none"
            required
          />
        </div>
        <div className="mt-6">
          <button
            as={"button"}
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-sm transition"
          >
            Iniciar Sesión
          </button>
        </div>
        <div className="flex w-full justify-around py-6 pb-4">
          <h2 className="font-semibold">¿Todavía no te registraste?</h2>
          <Link
            href={"/auth/registrar-usuario"}
            className="text-blue-600 font-bold cursor-pointer"
          >
            Crea tu cuenta
          </Link>
        </div>
      </form>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </div>
  );
};

export default FormularioIniciarSesion;
