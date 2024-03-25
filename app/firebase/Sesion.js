import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { providerGoogle, auth } from "./FirebaseConfig";

export const iniciarSesion = async (campos) => {
  await signInWithEmailAndPassword(auth, campos.correo, campos.contraseña);
};

export const registrarUsuario = async (campos) => {
  await createUserWithEmailAndPassword(auth, campos.correo, campos.contraseña);
};

export const iniciarSesionGoogle = async () => {
  await signInWithPopup(auth, providerGoogle);
};
