import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { nroSiguiente } = params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query
        `SELECT MAX(idTicket) + ${nroSiguiente} as idTicket FROM ST_Tickets`
      ;

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener datos.", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
