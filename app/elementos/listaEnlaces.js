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
    href: "/admin/ticket/tickets-sin-abrir",
  },
  {
    label: "Mis tickets",
    href: "/admin/ticket/mis-tickets",
  },
  {
    label: "Tickets Solicitados",
    href: "/admin/ticket/tickets-creados",
  },
];

const listaEstados = [
  {
    label: "Abiertos",
    estado: "abierto",
    href: "/admin/ticket/abierto",
  },
  {
    label: "Pendientes",
    estado: "pendiente",
    href: "/admin/ticket/pendiente",
  },
  {
    label: "En Proceso",
    estado: "proceso",
    href: "/admin/ticket/proceso",
  },
  {
    label: "Resueltos",
    estado: "resuelto",
    href: "/admin/ticket/resuelto",
  },
  {
    label: "Anulados",
    estado: "anulado",
    href: "/admin/ticket/anulado",
  },
  {
    label: "En Revisión",
    estado: "revision",
    href: "/admin/ticket/revision",
  },
];

export { listaSideBar, listaCategorias, listaEstados };
