"use client";

import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

const useObtenerTickets = () => {
  const [tickets, buscarTickets] = useState();
  useEffect(() => {
    const consulta = query(
      collection(db, "tickets"),
    );
    const unSuscribe = onSnapshot(consulta, (snapshot) =>
      buscarTickets(snapshot.docs.map((ticket) => ticket.data()))
    );
    return unSuscribe;
  }, []);
  return [tickets];
};

export default useObtenerTickets;
