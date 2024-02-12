"use client";

import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

 const iniciarSesion = async (campos) => {
  await signInWithEmailAndPassword(auth, campos.correo, campos.contraseña)
}
const registrarUsuario = async (campos) => {
  await createUserWithEmailAndPassword(auth, campos.correo, campos.contraseña)
}

const AuthProvider = ({ children }) => {
  const [usuario, cambiarUsuario] = useState({
    logged: false,
    email: null,
    uid:null
  });
  const [cargando, cambiarCargando] = useState(true)

  //Hook para realizar una comprobación una unica vez y asi saber si el usuario ingreso.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        cambiarUsuario({
          logged: true,
          email: user.email,
          uid:user.uid
        });
        cambiarCargando(false)
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrarUsuario }}>
      {cargando === false && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
