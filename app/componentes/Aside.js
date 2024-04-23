import { SideBar } from "./SideBar";
import { SubNav } from "./SubNav";
import { useDesplegable } from "../contexts/desplegableContext";

const Aside = () => {
  const { desplegar, setDesplegar } = useDesplegable();
  return (
    <>
      <aside
        className={`flex relative z-[999]`}
      >
        <SideBar desplegar={desplegar} setDesplegar={setDesplegar} />
        <SubNav desplegar={desplegar} setDesplegar={setDesplegar} />
      </aside>
    </>
  );
};
export default Aside;
