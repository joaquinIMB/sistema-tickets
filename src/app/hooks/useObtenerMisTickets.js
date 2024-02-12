"use client";

import { useAuth } from "../componentes/contexts/authContext";
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

const useObtenerMisTickets = () => {
  const { usuario } = useAuth();
  const [tickets, buscarTickets] = useState();
  useEffect(() => {
    const consulta = query(
      collection(db, "tickets"),
      where("idUsuario", "==", usuario.uid)
    );
    const unSuscribe = onSnapshot(consulta, (snapshot) =>
      buscarTickets(snapshot.docs.map((ticket) => ticket.data()))
    );
    return unSuscribe;
  }, [usuario]);
  return [tickets];
};

export default useObtenerMisTickets;
