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
    "getNextTicket"
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
        "getNextTicket"
      ],
    }),
    getMovimientoTicket: builder.query({
      query: (idTicket) => `ticket/movimientos/${idTicket}`,
      providesTags: ["movTicket"],
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
      invalidatesTags: ["tickets", "movTicket", "getTicketID"],
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
      invalidatesTags: ["tickets", "newTicket", "getTicketID"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetStateIdQuery,
  useGetTicketIdQuery,
  useCreateTicketMutation,
  useGetMovimientoTicketQuery,
  useCreateMovimientoTicketMutation,
  useUpdateTicketMutation,
  useUpdateDataUsuarioMutation,
  useGetTicketIdSectorQuery,
  useGetTicketIdUsuarioAsignadoQuery,
  useGetTicketIdUsuarioEmisorQuery,
  useGetNextIdTicketQuery
} = api;
