"use client";

import { db } from "@/firebase/FirebaseConfig";
import { collection, where, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";

const useTraerMovimientos = (idTicket) => {
  const [dataMovimientos, setDataMovimientos] = useState("");

  useEffect(() => {
    const referenciaMov = collection(db, "movimientoTicket");

    const movTickets = query(
        referenciaMov,
        where("idTicket", "==", idTicket),
        orderBy("fechaHoraRegistro", "asc")
      );
    const movimientoSnapshot = onSnapshot(movTickets, (snapshot) => {
      setDataMovimientos(snapshot.docs.map((movimiento) => movimiento.data()));
    });
    return movimientoSnapshot;
  }, [idTicket, setDataMovimientos]);

  return dataMovimientos;
};

export default useTraerMovimientos;
