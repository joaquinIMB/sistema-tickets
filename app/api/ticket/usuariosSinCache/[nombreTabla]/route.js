//  UTILIZO UNA API ROUTE DINAMICA PARA RESOLVER EL PROBLEMA DE REFETCH EN ALMACENAMIENTO CACHÉ AL REALIZAR UNA CONSULTA ESTÁTICA
// YA QUE NO OBTENGO LOS VALORES ACTUALIZADOS DE LA TABLA LUEGO DE INTERACTUAR CON LA MISMA

import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { nombreTabla } = params;

  try {
    const pool = await getConnection();
    const result = await pool.request().query`SELECT * FROM ST_usuarios`;
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener datos.", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
