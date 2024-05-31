import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET() {
  const pool = await getConnection();

  try {
    const result = await pool.request().query("SELECT * FROM ST_tickets");

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}