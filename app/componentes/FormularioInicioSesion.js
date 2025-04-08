"use client";

import { useMemo, useState } from "react";
import Alerta from "./Alerta";
import { useAuth } from "../contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/modalContext";
import { traerUsuario } from "@/funciones/traerUsuario";

const FormularioIniciarSesion = () => {
  const router = useRouter();
  const [campos, establecerCampos] = useState({
    idUsuario: "",
    contraseña: "",
  });
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { iniciarSesion, usuarioExistente } = useAuth();
  const { setIsModalOpen } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useMemo(() => {
    localStorage.removeItem("usuario");
    if (usuarioExistente) {
      establecerCampos({
        idUsuario: usuarioExistente.legajo,
      });
    }
  }, [usuarioExistente]);

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
    setIsSubmitting(true);
    const usuario = await traerUsuario(campos.idUsuario);
    if (campos.idUsuario === "" || campos.contraseña === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos.",
      });
      setIsSubmitting(false);
      return;
    }
    if (!usuario.length > 0) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "El legajo ingresado no existe.",
      });
      setIsSubmitting(false);
      return;
    }
    if (usuario[0]?.contraseña !== campos.contraseña) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "La contraseña ingresada es incorrecta.",
      });
      setIsSubmitting(false);
      return;
    }
    try {
      iniciarSesion(usuario[0]);
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "aceptado",
        mensaje: `¡Bienvenido/a de vuelta!`,
      });
      router.push("/admin/ticket/tickets-de-sector");
    } catch (error) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Ocurrió un error inesperado, vuelva a intentarlo.",
      });
      return;
    } finally {
      cambiarEstadoAlerta(false);
      cambiarAlerta({});
    }
  };

  return (
    <div className="container p-4 pb-2 pt-0">
      <h1 className="text-lg text-left font-bold w-full pt-2 pb-2 text-gray-600">
        Accede a tu cuenta
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto w-full bg-white rounded-md pt-2"
      >
        <div className="w-full">
          <label
            htmlFor="legajo"
            className="block text-base font-medium text-gray-700"
          >
            Legajo
          </label>
          <input
            type="text"
            id="legajo"
            name="idUsuario"
            placeholder="Ingresá tu legajo"
            value={campos.idUsuario}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-black outline-none"
            required
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="contraseña"
            className="block text-base font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contraseña"
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
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-sm transition"
          >
            {isSubmitting && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-6 h-6 me-2 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {isSubmitting ? "Iniciando..." : "Iniciar Sesion"}
          </button>
        </div>
        <div className="flex w-full justify-around py-6 pb-4 gap-2">
          <h2 className="font-semibold">¿Todavía no te registraste?</h2>
          <Link
            href={"/auth/registrar-usuario"}
            className="text-blue-600 font-bold cursor-pointer"
            onClick={() => setIsModalOpen(true)}
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
