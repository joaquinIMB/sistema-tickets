import { NextResponse } from "next/server";
import { db } from "@/app/firebase/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export const GET = async (request) => {
  const referenciaUsuario = collection(db, "usuarios");

  const usuarios = query(referenciaUsuario);

  const usuarioSnapshot = await getDocs(usuarios);

  const documentos = usuarioSnapshot.docs.map((usuario) => usuario.data());

  return NextResponse.json(documentos);
};
