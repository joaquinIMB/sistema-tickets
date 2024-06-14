import { getConnection } from "@/database/sqlConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { idTicket } = params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query`select * from ST_movimientoTicket where idTicket = ${idTicket}`;

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener datos.", err);
  }
}

// import { NextResponse } from "next/server";
// import { db } from "@/firebase/FirebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";

// export const GET = async (request, { params }) => {
//   const { idTicket } = params;

//   const referenciaTicket = collection(db, "movimientoTicket");

//   const tickets = query(
//     referenciaTicket,
//     where("idTicket", "==", idTicket)
//   );

//   const ticketSnapshot = await getDocs(tickets);

//   const documentos = ticketSnapshot.docs.map((ticket) => ticket.data());

//   return NextResponse.json(documentos);
// };
