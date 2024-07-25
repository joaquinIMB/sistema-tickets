import { API_URL_SERVICES } from "@/routes/apiRoutes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL_SERVICES}` }),
  tagTypes: [
    "tickets",
    "newTicket",
    "movTicket",
    "getTicketID",
    "getStateID",
    "getSectorID",
    "getTicketUsuarioAsignado",
    "getTicketUsuarioEmisor",
    "getNextTicket",
    "getTablaUsuarios",
    "notificacionesPorSector",
    "notificacionesPorUsuario",
  ],
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "ticket",
      keepUnusedDataFor: 1,
      refetchOnMountOrArgChange: 1,
      providesTags: ["tickets"],
    }),
    getTicketId: builder.query({
      query: (idTicket) => `ticket/${idTicket}`,
      providesTags: ["getTicketID"],
    }),
    getStateId: builder.query({
      query: (idEstado) => `ticket/estado/${idEstado}`,
      providesTags: ["getStateID"],
    }),
    getTicketIdSector: builder.query({
      query: (idSector) => `ticket/ticket-sector/${idSector}`,
      providesTags: ["getSectorID"],
    }),
    getTicketIdUsuarioAsignado: builder.query({
      query: (idUsuario) => `ticket/ticketPorAsignado/${idUsuario}`,
      providesTags: ["getTicketUsuarioAsignado"],
    }),
    getTicketIdUsuarioEmisor: builder.query({
      query: (idUsuario) => `ticket/ticketPorEmisor/${idUsuario}`,
      providesTags: ["getTicketUsuarioEmisor"],
    }),
    getNextIdTicket: builder.query({
      query: (nroSiguiente) => `ticket/traerIdTicket/${nroSiguiente}`,
      providesTags: ["getNextTicket"],
    }),
    getSectorPorIdUsuario: builder.query({
      query: (nombreTabla) => `ticket/usuariosSinCache/${nombreTabla}`,
      providesTags: ["getTablaUsuarios"],
    }),
    getMovimientoTicket: builder.query({
      query: (idTicket) => `ticket/movimientos/${idTicket}`,
      providesTags: ["movTicket"],
    }),
    getNotificacionPorSector: builder.query({
      query: (idSector) => `ticket/traerNotificacionPorSector/${idSector}`,
      providesTags: ["notificacionesPorSector"],
    }),
    getNotificacionPorUsuario: builder.query({
      query: (idUsuario) => `ticket/traerNotificacionPorUsuario/${idUsuario}`,
      providesTags: ["notificacionesPorUsuario"],
    }),
    createTicket: builder.mutation({
      query: (campos) => ({
        url: "/ticket/insertTicket",
        method: "POST",
        body: JSON.stringify({
          correoUsuarioEmisor: campos.correoUsuarioEmisor,
          descripcionTicket: campos.descripcionTicket,
          fechaHoraRegistro: campos.fechaHoraRegistro,
          idEstado: campos.idEstado,
          idSector: campos.idSector,
          idTicket: campos.idTicket,
          legajoAsignado: campos.legajoAsignado,
          nombreEmisor: campos.nombreEmisor,
          nombreUsuarioAsignado: campos.nombreUsuarioAsignado,
          prioridad: campos.prioridad,
          tituloTicket: campos.tituloTicket,
          legajoEmisor: campos.legajoEmisor,
        }),
      }),
      invalidatesTags: [
        "newTicket",
        "getStateID",
        "getSectorID",
        "getTicketUsuarioAsignado",
        "getTicketUsuarioEmisor",
        "getNextTicket",
      ],
    }),
    createMovimientoTicket: builder.mutation({
      query: (campos) => ({
        url: "/ticket/insertMovimientoTicket",
        method: "POST",
        body: JSON.stringify({
          descripcionMovimiento: campos.descripcionMovimiento,
          fechaHoraRegistro: campos.fechaHoraRegistro,
          idEstado: campos.idEstado,
          idMovimientoTicket: campos.idMovimientoTicket,
          idSector: campos.idSector,
          idTicket: campos.idTicket,
          legajoAsignado: campos.legajoAsignado,
          legajoEmisor: campos.legajoEmisor,
          prioridad: campos.prioridad,
        }),
      }),
      invalidatesTags: [
        "tickets",
        "movTicket",
        "getTicketID",
        "getTicketUsuarioAsignado",
        "getTicketUsuarioEmisor",
        "getSectorID",
      ],
    }),
    createNotificacionTicket: builder.mutation({
      query: (campos) => ({
        url: `/ticket/insertNotificaciones/${campos.idUsuario}`,
        method: "POST",
        body: JSON.stringify({
          idSector: campos.idSector,
          mensaje: campos.mensaje,
          leido: 0,
          fechaHora: campos.fechaHoraRegistro,
          idTicket: campos.idTicket,
          idMovimientoTicket: campos.idMovimientoTicket || 1,
          idUsuarioEmisor: campos.legajoEmisor,
        }),
      }),
    }),
    updateTicket: builder.mutation({
      query: (campos) => ({
        url: `/ticket/updateTicket/${campos.idTicket}`,
        method: "POST",
        body: JSON.stringify({
          idEstado: campos.idEstado,
          idSector: campos.idSector,
          legajoAsignado: campos.legajoAsignado,
          nombreUsuarioAsignado: campos.nombreUsuarioAsignado,
          prioridad: campos.prioridad,
        }),
      }),
      invalidatesTags: ["newTicket", "tickets", "getTicketID"],
    }),
    updateDataUsuario: builder.mutation({
      query: (campos) => ({
        url: `/ticket/updateSector/${campos.idUsuario}`,
        method: "POST",
        body: JSON.stringify({
          idSector: campos.idSector,
        }),
      }),
      invalidatesTags: [
        "tickets",
        "newTicket",
        "getTicketID",
        "getTablaUsuarios",
      ],
    }),
    updateNotificacionLeida: builder.mutation({
      query: (id) => ({
        url: `/ticket/updateNotificacionLeida/${id}`,
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
      }),
      invalidatesTags: ["notificacionesPorSector", "notificacionesPorUsuario"],
    }),
    executeStoredProcedure: builder.query({
      query: ({ idSector, cadena, idUsuario }) => `ticket/traerResultadoBusqueda/${idSector},${cadena},${idUsuario}`,
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetStateIdQuery,
  useGetTicketIdQuery,
  useGetTicketIdSectorQuery,
  useGetTicketIdUsuarioAsignadoQuery,
  useGetTicketIdUsuarioEmisorQuery,
  useGetMovimientoTicketQuery,
  useGetNextIdTicketQuery,
  useGetSectorPorIdUsuarioQuery,
  useGetNotificacionPorSectorQuery,
  useGetNotificacionPorUsuarioQuery,
  useCreateTicketMutation,
  useCreateMovimientoTicketMutation,
  useCreateNotificacionTicketMutation,
  useUpdateTicketMutation,
  useUpdateDataUsuarioMutation,
  useUpdateNotificacionLeidaMutation,
  useExecuteStoredProcedureQuery
} = api;
