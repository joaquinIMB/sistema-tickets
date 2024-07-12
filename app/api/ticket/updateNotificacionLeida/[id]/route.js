import sql from "mssql";
import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`UPDATE ST_notificaciones SET leido = 1 where id = ${id}`);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al insertar en la base de datos:", err);
  }
}
