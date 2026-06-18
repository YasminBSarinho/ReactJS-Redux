"use client";

import Input from "@/components/ui/Input";
import Button from "../ui/Button";

import { useState } from "react";
import { useRouter } from "next/navigation";


import usuarios from "../../data/usuarios";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/user/userSlice";

export default function CardLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(){
    let usuarioEncontraddo = null;

    console.log("Email digitado:", email);
    console.log("Senha digitada:", senha);
    console.log("Usuários:", usuarios);

    for (const usuario of usuarios) {
      if ( usuario.email === email &&usuario.senha === senha) {
        usuarioEncontraddo = usuario;
        break;
      }
    }

    console.log("Usuário encontrado:", usuarioEncontraddo);

    if (!usuarioEncontraddo) {
      setErro("Dados inválidos");
      return;
    }

    console.log(usuarioEncontraddo);

    dispatch(
      login({
        nome: usuarioEncontraddo.nome,
        email: usuarioEncontraddo.email,
        perfil: usuarioEncontraddo.perfil,
      })
    );

    router.push("/dashboard");

  }

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">
          Bem-vindo de volta
        </h1>

        <p className="mt-3 text-[var(--text-secondary)] underline decoration-sky-500">
          Entre com suas credenciais para acessar
        </p>
      </div>

      <div className="space-y-6">
        <Input
          titulo="E-mail"
          placeholder="email@dbccompany.com.br"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          titulo="Senha"
          placeholder="Digite sua senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <p className="text-sm text-[var(--error)]">
            {erro}
          </p>
        )}

        <Button 
            text="Logar"
            onClick={handleLogin}
        />
      </div>
    </div>
  );
}