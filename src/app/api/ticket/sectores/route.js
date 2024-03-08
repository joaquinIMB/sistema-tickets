import { NextResponse } from "next/server";
import { db } from "@/app/firebase/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export const GET = async (request) => {
  const referenciaSectores = collection(db, "sectores");

  const sectores = query(referenciaSectores);

  const sectoresSnapshot = await getDocs(sectores);

  const documentos = sectoresSnapshot.docs.map((sectores) => sectores.data());

  return NextResponse.json(documentos);
};
