"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import Button from "@/components/ui/Button";
import { useAppSelector } from "@/redux/hooks";

import { useGetChamadoByIdQuery } from "@/redux/api/chamadosApi";
import {
  useGetComentariosPorChamadoQuery,
  useCriarComentarioMutation,
} from "@/redux/api/comentariosApi";
import { useAtualizarStatusChamadoMutation } from "@/redux/api/chamadosApi";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

export default function DetalhesChamadoPage() {
  //pega o id da url
  const params = useParams();
  const id = params.id as string;

  const [texto, setTexto] = useState("");
  const { usuario } = useAppSelector((state) => state.user);
  const { data: chamado, isLoading, error} = useGetChamadoByIdQuery(id); // faz a requisição usando o id que pegou
  const { data: comentarios, isLoading: carregandoComentarios} = useGetComentariosPorChamadoQuery(id,  {pollingInterval: 10000}); //pega os comentarios atribuidos a esse chamado, e faz o polling(refaz a requisição)

  const router = useRouter(); 
  useEffect(() => { if (!usuario) { router.push("/login"); } }, [usuario, router]);

  const [criarComentario] = useCriarComentarioMutation(); //hook de mutation, ele cria novos comentarios
  const [atualizarStatusChamado] = useAtualizarStatusChamadoMutation(); // outro hook mutation, vai atualizar os status dos chamados

  async function handleComentar() {
    if (!texto.trim()) {
      return;
    }

    //cria um comentario e vincula ao chamado atual, usando aquele mesmo id que peguei da url no inicio
    await criarComentario({
      chamadoId: id,
      autor: usuario?.nome || "Usuário",
      texto,
    }).unwrap(); // unwrap faz uma mutation se comportar como uma promise , se for sucesso retornas os dados da api, se erro lança uma excecao
    setTexto("");
  }

  async function handleAlterarStatus(status: string) {
    //atualzia so o status do chamado
    await atualizarStatusChamado({
      id,
      status,
    }).unwrap();
}

  if (isLoading) {
    return <p>Carregando chamado...</p>;
  }

  if (error || !chamado) {
    return <p>Erro ao carregar chamado.</p>;
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">
            {chamado.titulo}
          </h1>

          <p className="mt-3 text-[var(--text-secondary)]">
            Detalhes e acompanhamento do chamado.
          </p>
        </div>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
              {chamado.status}
            </span>

            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-secondary)]">
              Prioridade: {chamado.prioridade}
            </span>

            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-secondary)]">
              Solicitante: {chamado.solicitante}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Descrição
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
              {chamado.descricao}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              text="Em andamento"
              onClick={() => handleAlterarStatus("Em andamento")}
            />

            <Button
              text="Resolvido"
              onClick={() => handleAlterarStatus("Resolvido")}
            />

            <Button
              text="Fechado"
              onClick={() => handleAlterarStatus("Fechado")}
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Comentários
          </h2>

          <div className="mt-6 space-y-4">
            {carregandoComentarios && (
              <p className="text-[var(--text-secondary)]">
                Carregando comentários...
              </p>
            )}

            {comentarios?.map((comentario) => (
              <div
                key={comentario.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
              >
                <p className="font-medium text-[var(--text-primary)]">
                  {comentario.autor}
                </p>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {comentario.texto}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <label className="text-sm font-medium text-[var(--text-primary)]">
              Novo comentário
            </label>

            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite uma atualização sobre o chamado"
              className="mt-2 min-h-28 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />

            <div className="mt-4 w-48">
              <Button
                text="Comentar"
                onClick={handleComentar}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}