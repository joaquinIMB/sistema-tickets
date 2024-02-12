import BarraDeBusqueda from "./BarraDeBusqueda";
import BotonCrearTicket from "./BotonCrearTicket";

export const Header = () => {
  return (
    <header className="sticky flex top-0 z-20 bg-[#fcfcfc] border-b-2 border-opacity-5 border-black items-center px-6 py-4 text-white h-[4.2rem] w-auto">
      <div className="flex items-center justify-between w-full pt-1 px-4">
        <BarraDeBusqueda />
        <BotonCrearTicket />
      </div>
    </header>
  );
};
