import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { idUsuario } = params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query`select * from st_usuarios where idUsuario = ${idUsuario}`;

    const response = NextResponse.json(result.recordset);

    return response;
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}
