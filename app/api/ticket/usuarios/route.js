import { NextResponse } from "next/server";
import { db } from "@/firebase/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export const GET = async (request) => {
  const referenciaUsuario = collection(db, "usuarios");

  const usuarios = query(referenciaUsuario);

  const usuarioSnapshot = await getDocs(usuarios);

  const documentos = usuarioSnapshot.docs.map((usuario) => usuario.data());

  return NextResponse.json(documentos);
};


// SQL
// import { getConnection } from "@/database/sqlConfig";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const pool = await getConnection();
//     const result = await pool.request().query("SELECT * FROM ST_usuarios");
//     return NextResponse.json(result.recordset);
//   } catch (error) {
//     console.error("Error al obtener datos.", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }