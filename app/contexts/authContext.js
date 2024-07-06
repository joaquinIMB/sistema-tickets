"use client";

import { useContext, useState, useEffect, createContext } from "react";
import { Loader } from "@/elementos/Loader";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [usuario, cambiarUsuario] = useState({
    logged: false,
    email: null,
    legajo: null,
    idSector: null,
  });
  const [cargando, cambiarCargando] = useState(true);
  const [usuarioExistente, setUsuarioExistente] = useState();
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    // Verificar el estado de autenticación en localStorage
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.logged) {
        cambiarUsuario(parsedUser);
      }
    }
    cambiarCargando(false);
  }, []);

  const iniciarSesion = (usuarioActual) => {
    const newUser = {
      logged: true,
      email: usuarioActual.correo,
      legajo: usuarioActual.idUsuario,
      idSector: usuarioActual.idSector,
    };
    cambiarUsuario(newUser);
    localStorage.setItem("usuario", JSON.stringify(newUser));
  };

  const cerrarSesion = () => {
    const loggedOutUser = {
      logged: false,
      email: null,
      legajo: null,
    };
    cambiarUsuario(loggedOutUser);
    localStorage.removeItem("usuario");
    router.push("/auth/iniciar-sesion");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        usuarioExistente,
        iniciarSesion,
        cerrarSesion,
        setUsuarioExistente,
      }}
    >
      {cargando && pathname !== "/" ? <Loader /> : children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
