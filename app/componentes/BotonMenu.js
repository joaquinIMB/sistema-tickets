import Image from "next/image";
import styles from "@/componentes/admin.module.css";

export default function BotonMenu({ setDesplegar, desplegar }) {
  return (
    <button className="m-auto outline-none">
      <Image
        onClick={() => setDesplegar(!desplegar)}
        className={`${styles.botonDesplegarSideBar} m-auto`}
        src="/menu.png"
        alt="Logo de busqueda"
        width={80}
        height={80}
      />
    </button>
  );
}
