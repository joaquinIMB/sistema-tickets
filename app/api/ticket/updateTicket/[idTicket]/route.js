import sql from "mssql";
import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { idTicket } = params;
  const body = await req.json();

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idEstado", sql.VarChar(14), body.idEstado)
      .input("idSector", sql.VarChar(14), body.idSector)
      .input("legajoAsignado", sql.Char(5), body.legajoAsignado)
      .input("prioridad", sql.VarChar(5), body.prioridad)
      .input(
        "nombreUsuarioAsignado",
        sql.VarChar(30),
        body.nombreUsuarioAsignado
      )
      .query`UPDATE ST_tickets SET idEstado = @idEstado, idSector = @idSector, legajoAsignado = @legajoAsignado, prioridad = @prioridad, nombreUsuarioAsignado = @nombreUsuarioAsignado where idTicket = ${idTicket}`;

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al insertar en la base de datos:", err);
  }
}
