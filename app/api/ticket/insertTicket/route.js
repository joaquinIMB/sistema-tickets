import sql from "mssql";
import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("correoUsuarioEmisor", sql.VarChar(50), body.correoUsuarioEmisor)
      .input("descripcionTicket", sql.VarChar(100), body.descripcionTicket)
      .input("fechaHoraRegistro", sql.Char(18), body.fechaHoraRegistro)
      .input("idEstado", sql.VarChar(12), body.idEstado)
      .input("idSector", sql.VarChar(14), body.idSector)
      .input("idTicket", sql.Int, body.idTicket)
      .input("nombreEmisor", sql.VarChar(30), body.nombreEmisor)
      .input(
        "nombreUsuarioAsignado",
        sql.VarChar(30),
        body.nombreUsuarioAsignado
      )
      .input("prioridad", sql.Char(5), body.prioridad)
      .input("tituloTicket", sql.VarChar(50), body.tituloTicket)
      .input("legajoEmisor", sql.VarChar(4), body.legajoEmisor)
      .input("legajoAsignado", sql.VarChar(5), body.legajoAsignado)
      .query(
        "INSERT INTO ST_tickets (correoUsuarioEmisor, descripcionTicket, fechaHoraRegistro, idEstado, idSector, idTicket, nombreEmisor, nombreUsuarioAsignado, prioridad, tituloTicket, legajoEmisor, legajoAsignado) VALUES (@correoUsuarioEmisor, @descripcionTicket, @fechaHoraRegistro, @idEstado, @idSector, @idTicket, @nombreEmisor, @nombreUsuarioAsignado, @prioridad, @tituloTicket, @legajoEmisor, @legajoAsignado)"
      );

    // Usar res para enviar una respuesta exitosa
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al insertar en la base de datos:", err);
  }
}
