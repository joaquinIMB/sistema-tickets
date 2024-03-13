export const Filtros = () => {
  return (
    <section className="relative bg-[#fcfcfc] flex items-center border-black border-b border-opacity-5 p-2 px-8 text-white h-14 w-full">
      <div className="flex items-center gap-3 w-full ">
        <button className=" bg-white text-blue-600 text-sm transition-all font-semibold hover:text-blue-500 border border-blue-600 hover:border-blue-600 cursor-pointer rounded-sm w-28 py-2">
          Agregar Filtro
        </button>
      </div>
    </section>
  );
};
