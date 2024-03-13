import Image from "next/image";
import styles from "@/componentes/admin.module.css";

export default function BotonMenu({ setDesplegar }) {
  return (
    <button>
      <Image
        onClick={() => setDesplegar(false)}
        className={`${styles.botonDesplegarSideBar}`}
        src="/menu.png"
        alt="Logo de busqueda"
        width={100}
        height={100}
      />
    </button>
  );
}
