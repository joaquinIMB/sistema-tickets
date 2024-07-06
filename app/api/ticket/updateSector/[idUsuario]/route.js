import sql from "mssql";
import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { idUsuario } = params;
  const body = await req.json();
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idSector", sql.VarChar(14), body.idSector)
      .input("idUsuario", sql.VarChar(8), idUsuario)
      .query(
        `UPDATE Agentes SET idSector = @idSector where codctacte = @idUsuario`
      );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error al insertar en la base de datos:", err);
  }
}
