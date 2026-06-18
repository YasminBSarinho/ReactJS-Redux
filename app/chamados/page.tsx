"use client";

import { useGetChamadosQuery } from "@/redux/api/chamadosApi";
import CardChamado from "@/components/layout/CardChamado";
import BuscaChamado from "@/components/ui/BuscaChamado";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAppSelector } from "@/redux/hooks"; 
import { useEffect } from "react";

export default function ChamadosPage() {
  const {data: chamados, isLoading, error} = useGetChamadosQuery(undefined, {pollingInterval: 10000}); //polling a cada 10 segundosa
  const [busca, setBusca] = useState("");

  const { usuario } = useAppSelector((state) => state.user); 
  const router = useRouter(); 
  useEffect(() => { if (!usuario) { router.push("/login"); } }, [usuario, router]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar chamados.</p>;
  }

  const chamadosFiltrados = chamados?.filter(
    (chamado) =>
      chamado.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      chamado.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Chamados
        </h1>

        <p className="mt-2 text-[var(--text-secondary)]">
          Acompanhe os chamados cadastrados no sistema.
        </p>

        <BuscaChamado
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {chamadosFiltrados?.map((chamado) => (
          <CardChamado
            id={chamado.id}
            key={chamado.id}
            titulo={chamado.titulo}
            descricao={chamado.descricao}
            prioridade={chamado.prioridade}
            status={chamado.status}
            solicitante={chamado.solicitante}
            createdAt={chamado.createdAt}
          />
        ))}
      </div>
    </main>
  );
}