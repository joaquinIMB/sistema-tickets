import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { idSector } = params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query
        `SELECT * FROM ST_notificaciones WHERE idSector = ${idSector} AND leido = 0 AND idUsuario = 'Todos'`
      ;

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener datos.", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
