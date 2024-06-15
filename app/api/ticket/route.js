import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM ST_tickets");

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}