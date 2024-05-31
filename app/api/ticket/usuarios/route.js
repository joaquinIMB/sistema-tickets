import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  const pool = await getConnection();

  try {
    const result = await pool.request().query("SELECT * FROM ST_usuarios");

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}