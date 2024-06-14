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
    label: "Nuevos",
    href: urlBase("tickets-sin-abrir"),
  },
  {
    label: "Mis tickets",
    href: urlBase("mis-tickets"),
  },
  {
    label: "Tickets Solicitados",
    href: urlBase("tickets-creados"),
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
