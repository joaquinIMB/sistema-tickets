"use client";

import { useState } from "react";
import Alerta from "./Alerta";
import { useAuth } from "../contexts/authContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import Link from "next/link";
import { SeleccionarSector } from "./SeleccionarSector";

const FormularioRegistroUsuario = ({ dataSector }) => {
  const { registrarUsuario } = useAuth();
  const [campos, cambiarCampos] = useState({
    idUsuario: "",
    idSector: "",
    nombreUsuario: "",
    apellidoUsuario: "",
    telefonoContacto: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

  const validarCampos = () => {
    const camposVacios = Object.values(campos).some((valor) => valor === "");
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

  const crearUsuario = async (campos) => {
    const docRef = doc(db, "usuarios", campos.idUsuario);
    return setDoc(docRef, { ...campos }).then(() => {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "correcto",
        mensaje: "Se creó el usuario correctamente",
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    cambiarCampos((prevCampos) => ({
      ...prevCampos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});
    if (validarCampos()) {
      return;
    }
    if (!expresionRegular.test(campos.correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa un correo válido",
      });
      return;
    }
    if (campos.contraseña !== campos.confirmarContraseña) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Las contraseñas no coinciden",
      });
      return;
    }
    if (campos.idSector === "Sucursal") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Selecciona una sucursal",
      });
      return;
    }
    try {
      await registrarUsuario(campos);
      await crearUsuario(campos);
      cambiarCampos({
        idUsuario: "",
        idSector: "",
        nombreUsuario: "",
        apellidoUsuario: "",
        telefonoContacto: "",
        correo: "",
        contraseña: "",
        confirmarContraseña: "",
      });
      establecerSector("Selecciona un sector");
      establecerSucursal("Ingresa tu sucursal");
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "La contraseña tiene que ser de al menos 6 caracteres",
          });
          break;
        case "auth/email-already-in-use":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje:
              "Ya existe una cuenta con el correo electrónico proporcionado",
          });
          break;
        case "auth/invalid-email":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "El correo electrónico no es válido",
          });
          break;
        default:
          console.log(error);
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "Hubo un error al intentar crear la cuenta",
          });
          break;
      }
    }
  };

  return (
    <>
      <h1 className="text-base font-bold mb- w-full px-4">
        Registrate para comenzar.
      </h1>
      <form
        className="max-w-md mx-auto pt-0 p-4 bg-white "
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-base font-medium text-gray-700 py-4 pb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombreUsuario"
              value={campos.nombreUsuario}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="apellido"
              className="block text-base font-medium text-gray-700 py-4 pb-2"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellidoUsuario"
              value={campos.apellidoUsuario}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
        </div>
        <div>
          <span className="block text-base font-medium text-gray-700 py-4 pb-2">
            Sector
          </span>
          <SeleccionarSector
            dataSector={dataSector}
            campos={campos}
            cambiarCampos={cambiarCampos}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="legajo"
              className="block text-base font-medium text-gray-700 py-4 pb-2"
            >
              Legajo
            </label>
            <input
              type="number"
              id="legajo"
              name="idUsuario"
              value={campos.idUsuario}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="contacto"
              className="block text-base font-medium text-gray-700 py-4 pb-2"
            >
              Contacto
            </label>
            <input
              type="number"
              id="contacto"
              name="telefonoContacto"
              value={campos.telefonoContacto}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="correo"
            className="block text-base font-medium text-gray-700 py-4 pb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={campos.correo}
            onChange={handleChange}
            className="bg-white p-2 w-full border border-black outline-none "
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contraseña"
              className="block text-base font-medium text-gray-700 py-4 pb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={campos.contraseña}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="confirmarContraseña"
              className="block text-base font-medium text-gray-700 py-4 pb-2"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={campos.confirmarContraseña}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            as={"button"}
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-sm transition"
          >
            Registrarse
          </button>
        </div>
        <div className="flex w-full justify-around p-6 py-4">
          <h2 className="font-semibold">¿Ya tenés una cuenta?</h2>
          <Link
            href={"/admin/auth/iniciar-sesion"}
            className="text-blue-600 font-bold cursor-pointer"
          >
            Inicia sesión
          </Link>
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

export default FormularioRegistroUsuario;
