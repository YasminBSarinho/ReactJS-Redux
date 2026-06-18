"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/user/userSlice";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

import Button from "@/components/ui/Button";



export default function Teste() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { tema, alternarTema } = useContext(ThemeContext);
  const { usuario } = useAppSelector((state) => state.user);


  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario, router]);

  function handleLogout(){
    dispatch(logout());

    router.push("/login");  
  }

  function handleAbrirChamado() {
    router.push("/cadastroChamado");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] ">
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 shadow-lg">
        <div className="border-b border-[var(--border)] pb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Bem-vindo, {usuario?.nome}
          </h1>

          <p className="mt-2 text-[var(--text-secondary)]">
            Você está autenticado no sistema.
          </p>
        </div>

        <div className="mt-6">
          <span className="text-sm text-[var(--text-secondary)]">
            Perfil
          </span>

          <p className="mt-1 text-lg font-semibold text-[var(--text-primary)] capitalize">
            {usuario?.perfil}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            text="Abrir Chamado"
            onClick={handleAbrirChamado}
          />

          <Button
            text="Logout"
            onClick={handleLogout}
          />

          <Button
            text={tema === "dark" ? "Tema Claro" : "Tema Escuro"}
            onClick={alternarTema}
          />
        </div>
      </div>
    </main>
  );
}