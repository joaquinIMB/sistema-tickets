export const HeaderListaTickets = () => {
  return (
    <ul className="grid grid-cols-7 container text-lg font-medium text-black list-none bg-[#ffffff30] backdrop-blur-sm sticky top-[66px] z-10 py-4 pl-0 pr-8 items-center text-center">
      <li>N°</li>
      <li>Usuario</li>
      <li>Motivo</li>
      <li>Estado</li>
      <li>Descripción</li>
      <li>Prioridad</li>
      <li>Fecha de creación</li>
    </ul>
  );
};
