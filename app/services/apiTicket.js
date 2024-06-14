import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["tickets", "newTicket", "movTicket", "getTicketID"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }), // Ajusta la URL base
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "ticket",
      providesTags: ["tickets"],
    }),
    getNewTickets: builder.query({
      query: () => "ticket/tickets-sin-abrir",
      providesTags: ["newTicket"],
    }),
    getTicketId: builder.query({
      query: (idTicket) => `ticket/${idTicket}`,
      providesTags: ["getTicketID"],
    }),
    getStateId: builder.query({
      query: (idEstado) => `ticket/estado/${idEstado}`,
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
      invalidatesTags: ["newTicket"],
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
      invalidatesTags: ["newTicket", "tickets"],
    }),
    updateDataUsuario: builder.mutation({
      query: (campos) => ({
        url: `/ticket/updateSector/${campos.idUsuario}`,
        method: "POST",
        body: JSON.stringify({
          idSector: campos.idSector,
        }),
      }),
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetNewTicketsQuery,
  useGetTicketIdQuery,
  useGetStateIdQuery,
  useCreateTicketMutation,
  useGetMovimientoTicketQuery,
  useCreateMovimientoTicketMutation,
  useUpdateTicketMutation,
  useUpdateDataUsuarioMutation,
} = api;
