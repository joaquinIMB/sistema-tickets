import { usePathname } from "next/navigation";
import { listaSideBar } from "./ui/listaEnlaces";

export const BuscaRuta = () => {
  const pathname = usePathname();
  return listaSideBar.map((enlace) => (
    <h1 className="text-2xl text-gray-600 font-semibold" key={enlace.label}>
      {enlace.href === pathname ? enlace.label : "Tickets"}
    </h1>
  ));
};
