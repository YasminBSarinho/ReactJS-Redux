"use client";

import { useState } from "react";
import { useCriaChamadoMutation } from "@/redux/api/chamadosApi";
import { useRouter } from "next/navigation"; 
import { useAppSelector } from "@/redux/hooks"; 
import { useEffect } from "react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AbrirChamadoPage() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("baixa");
  const [criarChamado] = useCriaChamadoMutation();

  const { usuario } = useAppSelector((state) => state.user); 
  const router = useRouter(); 
  useEffect(() => { if (!usuario) { router.push("/login"); } }, [usuario, router]);

  async function handleSubmit() {
    try {
      await criarChamado({
        titulo,
        descricao,
        prioridade,
        status: "Aberto",
        solicitante: "Cliente DBC",
      }).unwrap();

      alert("Chamado criado com sucesso!");

      setTitulo("");
      setDescricao("");
      setPrioridade("baixa");
    } catch (error) {
      console.error(error);

      alert("Erro ao criar chamado.");
    }
  }

  return (
  <main className="min-h-screen bg-[var(--background)] px-6 py-10">
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">
          Abrir Chamado
        </h1>

        <p className="mt-3 text-[var(--text-secondary)]">
          Informe os detalhes do problema para que a equipe de suporte possa analisar.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
        <div className="space-y-6">
          <Input
            titulo="Título do chamado"
            placeholder="Ex: Erro ao acessar o sistema"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-primary)]">
              Descrição do problema
            </label>

            <textarea
              placeholder="Descreva o problema com detalhes"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="min-h-40 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-primary)]">
              Prioridade
            </label>

            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <div className="w-52">
              <Button
                text="Abrir Chamado"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
}