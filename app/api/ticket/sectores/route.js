import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM ST_sectores");
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Error in GET request: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
