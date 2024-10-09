import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { idSector } = params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query`SELECT count (*) as cantidad FROM ST_tickets WHERE idSector = ${idSector} AND idEstado = 'nuevo' AND legajoAsignado = 'Todos'`;
    const [respuesta] = result.recordset;

    return NextResponse.json(respuesta.cantidad);
  } catch (error) {
    console.error("Error al obtener datos.", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
