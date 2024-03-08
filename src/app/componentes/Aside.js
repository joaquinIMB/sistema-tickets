import { SideBar } from "./SideBar";
import { SubNav } from "./SubNav";
import styles from "@/app/componentes/admin.module.css";
import { useDesplegable } from "../contexts/desplegableContext";

const Aside = () => {
  const { desplegar, setDesplegar } = useDesplegable();
  return (
    <>
      <aside className={`flex ${desplegar === false && styles.asideAdaptable}`}>
        <SideBar desplegar={desplegar} setDesplegar={setDesplegar} />
        <SubNav desplegar={desplegar} setDesplegar={setDesplegar} />
      </aside>
    </>
  );
};
export default Aside;
