import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { idEstado } = params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query`select * from ST_tickets where idEstado = ${idEstado} order by idTicket desc`;

    const response = NextResponse.json(result.recordset);

    return response;
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}
