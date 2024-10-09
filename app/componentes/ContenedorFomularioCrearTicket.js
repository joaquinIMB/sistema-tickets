"use client";

import { useEffect, useState } from "react";
import FormularioCrearTicket from "./FormularioCrearTicket";
import styles from "@/componentes/admin.module.css";
import { useModal } from "@/contexts/modalContext";
import Image from "next/image";

export const ContenedorFormularioCrearTicket = () => {
  const { handleCloseModal } = useModal();
  const [dataSector, setDataSector] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:3000/api/ticket";
      // : process.env.URL_DEV;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectoresResponse = await fetch(`${API_URL}/sectores`, {
          cache: "no-store",
        });

        const dataSector = await sectoresResponse.json();
        setDataSector(dataSector);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <>
      {!isLoading && (
        <div
          className={`${styles.modalBackdrop}`}
          onClick={() => handleCloseModal()}
        >
          <div
            className={`${styles.modalCrearTicket} max-md:w-[95%]`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleCloseModal()}
              className={`absolute top-[5px] right-[10px]`}
            >
              <Image
                src={"/cerrar.png"}
                alt="Botón para cerrar menú lateral"
                width={30}
                height={30}
              />
            </button>
            <FormularioCrearTicket dataSector={dataSector} />
          </div>
        </div>
      )}
    </>
  );
};
