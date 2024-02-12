'use client'

import { useEffect } from "react";
import styles from "@/app/componentes/alerta.module.css"

const Alerta = ({mensaje, tipo, estadoAlerta, cambiarEstadoAlerta}) => {
    useEffect(() => {
        let tiempo;
        if(estadoAlerta === true){
          tiempo = setTimeout(() => {
                cambiarEstadoAlerta(false)
            }, 2000)
        }return(() => clearTimeout(tiempo))
    }, [estadoAlerta, cambiarEstadoAlerta])
    return ( 
        <>
        {/* EstadoAlerta es true mostramos el componente si es falso no */}
        {estadoAlerta &&   
        <div tipo={tipo} className={`${styles.contenedorAlerta}${tipo === "error" ? 'bg-red' : 'bg-green'}`}>
            <p>{mensaje}</p>
        </div>}
        
        </>
     );
}

export default Alerta;