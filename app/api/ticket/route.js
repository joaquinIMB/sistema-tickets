import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM ST_tickets");

    const response = NextResponse.json(result.recordset);

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}
