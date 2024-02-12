const listaSideBar = [
  {
    label: "Tickets",
    href: "/panel",
    logo: "/boleto.png",
  },
];

const listaCategorias = [
  {
    label:"Todos los tickets",
    href: "/panel"
  },
  {
    label:"Mis tickets",
    href: "/panel/ticket/categoria-ticket/mis-tickets"
  },
  {
    label:"Mi sector",
    href: "/panel/ticket/categoria-ticket/mi-sector"
  },
]

const listaEstados=[
  {
    label:"Activo",
    href: "/panel/ticket/activo"
  },
  {
    label:"Pendiente",
    href: "/panel/ticket/pendiente"
  },
  {
    label:"En proceso",
    href: "/panel/ticket/proceso"
  },
  {
    label:"Resuelto",
    href: "/panel/ticket/resuelto"
  },
  {
    label:"Anulado",
    href: "/panel/ticket/anulado"
  },
  {
    label:"En revision",
    href: "/panel/ticket/revision"
  },
]

export { listaSideBar, listaCategorias, listaEstados };