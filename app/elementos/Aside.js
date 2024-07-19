import { SubNav } from "@/componentes/SubNav";
import { useDesplegable } from "@/contexts/desplegableContext";

const Aside = () => {
  const { desplegar, setDesplegar } = useDesplegable();
  return (
    <>
      <aside className={`relative z-[998]  ${desplegar ? "flex max-lg:flex" : "max-lg:hidden"}`}>
        <SubNav desplegar={desplegar} setDesplegar={setDesplegar}/>
      </aside>
    </>
  );
};
export default Aside;
