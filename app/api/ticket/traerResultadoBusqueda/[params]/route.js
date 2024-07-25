import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const [idSector, cadena, idUsuario] = params.params.split(",");

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("cadena", cadena)
      .input("sector", idSector)
      .input("idUsuario", idUsuario)
      .execute("ST_buscarTicket");

    const response = NextResponse.json(result.recordset);

    return response;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento almacenado.", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
