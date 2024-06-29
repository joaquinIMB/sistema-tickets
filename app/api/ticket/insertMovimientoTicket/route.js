import sql from "mssql";
import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input(
        "descripcionMovimiento",
        sql.VarChar(80),
        body.descripcionMovimiento
      )
      .input("fechaHoraRegistro", sql.VarChar(25), body.fechaHoraRegistro)
      .input("idEstado", sql.VarChar(14), body.idEstado)
      .input("idMovimientoTicket", sql.Int, body.idMovimientoTicket)
      .input("idSector", sql.VarChar(14), body.idSector)
      .input("idTicket", sql.Int, body.idTicket)
      .input("legajoAsignado", sql.Char(5), body.legajoAsignado)
      .input("legajoEmisor", sql.Int, body.legajoEmisor)
      .input("prioridad", sql.VarChar(5), body.prioridad)
      .query(
        "INSERT INTO ST_movimientoTicket (descripcionMovimiento, fechaHoraRegistro, idEstado, idMovimientoTicket, idSector, idTicket, legajoAsignado, legajoEmisor, prioridad) VALUES (@descripcionMovimiento, @fechaHoraRegistro, @idEstado, @idMovimientoTicket, @idSector, @idTicket, @legajoAsignado, @legajoEmisor, @prioridad)"
      );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al insertar en la base de datos:", err);
  }
}
