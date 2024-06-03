import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { idTicket } = params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`select * from ST_tickets where idTicket = ${idTicket}`);

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}
