import Link from "next/link";
import { TotalTickets } from "./TotalTicketsPorSeccion";

export const ListaTodosLosTickets = ({
  idSector,
  pathname,
  setDesplegar,
  totalTickets,
  isLoadingTotaltickets,
}) => {
  const enlace = {
    href: `/admin/ticket/todos/${idSector}`,
    label: "Todos",
  };
  return (
    <>
      <li
        className={` tracking-wide relative h-8 pt-2 ${
          enlace.href === pathname
            ? " text-blue-600 rounded-md"
            : "hover:text-blue-600 "
        }`}
        onClick={() => setDesplegar(false)}
      >
        <Link
          className="relative left-0 w-full py-1 pb-2 px-2"
          href={enlace.href}
        >
          {enlace.label}
        </Link>
        {isLoadingTotaltickets ? (
          <TotalTickets background={"bg-gray-300"} cantidad={0} />
        ) : (
          <TotalTickets
            background={"bg-gray-300"}
            cantidad={
              totalTickets
            }
          />
        )}
      </li>
    </>
  );
};
