import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// retorno da api
export type Chamado = {
    id: string;
    titulo: string;
    descricao: string;
    prioridade: string;
    status: string;
    solicitante: string;
    createdAt: string;
}

//request da api
type NovoChamado = {
  titulo: string;
  descricao: string;
  prioridade: string;
  status: string;
  solicitante: string;
};

type AtualizarStatusChamado = {
    id: string;
    status: string;
}

export const chamadosApi = createApi({
    reducerPath: "chamadosApi", //nome da api para store

    baseQuery: fetchBaseQuery({
        baseUrl: "https://6a32dbcfc6ca2aee4385b832.mockapi.io/dbc/api",
    }),

    tagTypes: ["Chamados"],

    endpoints: (builder) => ({
        // lista os chamados
        getChamados: builder.query<Chamado[], void>({
            query: () => "/chamados",
            providesTags: ["Chamados"],
        }),

        //cria um novo chamado
        criaChamado: builder.mutation<Chamado, NovoChamado>({
            query: (novoChamado) => ({
                url: "/chamados", //endpoint que a requisicao vai ser feita
                method: "POST", // metodo http
                body: novoChamado //corpo da requisicao 
            }),
            invalidatesTags: ["Chamados"] // ele invalida o cache
        }),

        //pega o chaamdo por id
        getChamadoById: builder.query<Chamado, string>({
            query: (id) => `/chamados/${id}`,
                providesTags: ["Chamados"],
        }),

        // atualiza o status dos chamado
        atualizarStatusChamado: builder.mutation<Chamado, AtualizarStatusChamado>({
            query: ({ id, status }) => ({
                url: `/chamados/${id}`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["Chamados"],
        }),
    }),
})

export const {useGetChamadosQuery, useCriaChamadoMutation, useGetChamadoByIdQuery, useAtualizarStatusChamadoMutation} = chamadosApi;