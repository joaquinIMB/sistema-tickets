import sql from "mssql";
import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const body = await req.json();
  const { idUsuario } = params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idUsuario", sql.VarChar(5), idUsuario)
      .input("idSector", sql.VarChar(14), body.idSector)
      .input("mensaje", sql.VarChar(255), body.mensaje)
      .input("leido", sql.Bit, body.leido)
      .input("fechaHora", sql.VarChar(25), body.fechaHora)
      .input("idTicket", sql.Int, body.idTicket)
      .input("idMovimientoTicket", sql.Int, body.idMovimientoTicket)
      .input("idUsuarioEmisor", sql.VarChar(5), body.idUsuarioEmisor)
      .query(
        "INSERT INTO ST_notificaciones (idUsuario, idSector, mensaje, leido, fechaHora, idTicket, idMovimientoTicket, idUsuarioEmisor) VALUES(@idUsuario, @idSector, @mensaje, @leido, @fechaHora, @idTicket, @idMovimientoTicket, @idUsuarioEmisor)"
      );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al insertar en la base de datos:", err);
  }
}
