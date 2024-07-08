import { urlBase, urlState } from "@/routes/appRoutes";

const listaSideBar = [
  {
    label: "Tickets",
    href: "/admin",
    logo: "/boleto.png",
  },
];

const listaCategorias = [
  {
    label: "Sin asignar",
    href: urlBase("tickets-de-sector"),
    seccion: "ticketsSector",
  },
  {
    label: "Mis tickets",
    href: urlBase("mis-tickets"),
    seccion: "ticketsAsignado",
  },
  {
    label: "Tickets Solicitados",
    href: urlBase("tickets-creados"),
    seccion: "ticketsEmisor",
  },
];

const listaEstados = [
  {
    label: "Abiertos",
    estado: "abierto",
    href: urlState("abierto"),
  },
  {
    label: "Pendientes",
    estado: "pendiente",
    href: urlState("pendiente"),
  },
  {
    label: "En Proceso",
    estado: "proceso",
    href: urlState("proceso"),
  },
  {
    label: "Resueltos",
    estado: "resuelto",
    href: urlState("resuelto"),
  },
  {
    label: "Anulados",
    estado: "anulado",
    href: urlState("anulado"),
  },
  {
    label: "En Revisión",
    estado: "revision",
    href: urlState("revision"),
  },
];

export { listaSideBar, listaCategorias, listaEstados };
