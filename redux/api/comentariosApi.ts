import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Comentario = {
  id: string;
  chamadoId: string;
  autor: string;
  texto: string;
  createdAt: string;
};

type NovoComentario = {
  chamadoId: string;
  autor: string;
  texto: string;
};

export const comentariosApi = createApi({
  reducerPath: "comentariosApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://6a32dbcfc6ca2aee4385b832.mockapi.io/dbc/api",
  }),

  tagTypes: ["Comentarios"],

  endpoints: (builder) => ({
    getComentariosPorChamado: builder.query<Comentario[], string>({
      query: (chamadoId) => `/comentarios?chamadoId=${chamadoId}`,
      providesTags: ["Comentarios"],
    }),

    criarComentario: builder.mutation<Comentario, NovoComentario>({
      query: (novoComentario) => ({
        url: "/comentarios",
        method: "POST",
        body: novoComentario,
      }),
      invalidatesTags: ["Comentarios"],
    }),
  }),
});

export const {
  useGetComentariosPorChamadoQuery,
  useCriarComentarioMutation,
} = comentariosApi;