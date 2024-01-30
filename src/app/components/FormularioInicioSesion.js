"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FormularioIniciarSesion = () => {
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");

  const route = useRouter();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        establecerCorreo(e.target.value);
        break;
      case "password":
        establecerPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    correo === "coder@coder.com" && password === "1234"
      ? route.push("/dashboard")
      : console.log("hola")
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-2 w-full bg-white rounded-md"
    >
      <div className="w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={correo}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mt-4">
        <button
          as={"button"}
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md shadow-sm"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default FormularioIniciarSesion;
