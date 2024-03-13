"use client";

import { useContext, useState, useEffect, createContext } from "react";
import { auth, providerGoogle } from "../firebase/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { Loader } from "../componentes/Loader";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const iniciarSesion = async (campos) => {
  await signInWithEmailAndPassword(auth, campos.correo, campos.contraseña);
};
const registrarUsuario = async (campos) => {
  await createUserWithEmailAndPassword(auth, campos.correo, campos.contraseña);
};
const cerrarSesion = async () => {
  await signOut(auth);
};
const iniciarSesionGoogle = async () => {
  await signInWithPopup(auth, providerGoogle);
};

function AuthProvider({ children }) {
  const [usuario, cambiarUsuario] = useState({
    logged: false,
    email: null,
    uid: null,
  });
  const [cargando, cambiarCargando] = useState(true);
  const router = useRouter()
  //Hook para realizar una comprobación una unica vez y asi saber si el usuario ingreso.
  useEffect(() => {
    setTimeout(cambiarCargando(false), 1000);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        cambiarUsuario({
          logged: true,
          email: user.email,
          uid: user.uid,
        });
        cambiarCargando(false);
      } else {
        cambiarUsuario({
          logged: false,
          email: null,
          uid: null,
        });
        cambiarCargando(false);
      }
    });
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        registrarUsuario,
        cerrarSesion,
        iniciarSesionGoogle,
      }}
    >
      {cargando ? <Loader /> : children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
