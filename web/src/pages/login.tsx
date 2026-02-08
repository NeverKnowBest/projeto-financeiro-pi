import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// 1. Importando a biblioteca poderosa
import { Toaster, toast } from "sonner";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // O toast.promise cria uma notificação que muda de estado sozinha!
    // Começa com "Carregando...", vira "Sucesso" ou "Erro".
    const promise = isLoginMode
      ? axios.post("http://localhost:3333/login", { email, password })
      : axios.post("http://localhost:3333/users", { email, password });

    toast.promise(promise, {
      loading: "Processando...",
      success: (response) => {
        if (isLoginMode) {
          setTimeout(() => navigate("/"), 1500);
          return `Bem-vindo, ${response.data.name}!`;
        } else {
          setIsLoginMode(true);
          return "Conta criada! Faça login agora.";
        }
      },
      error: (err) => {
        return err.response?.data?.message || "Erro ao conectar.";
      },
      // Estilizando para ficar IGUAL ao nosso tema Glass Dark
      style: {
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#fff",
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* --- AQUI ESTÁ A MÁGICA --- */}
      {/* O componente que renderiza as notificações flutuantes */}
      <Toaster
        position="top-right"
        expand={true}
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(5, 5, 5, 0.9)", // Fundo quase preto
            border: "1px solid rgba(255, 255, 255, 0.1)", // Borda sutil
            color: "white",
            backdropFilter: "blur(12px)", // Efeito vidro
          },
        }}
      />

      {/* Glow de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-800/30 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Card */}
      <div className="w-full max-w-md p-10 rounded-[32px] shadow-2xl relative z-10 border backdrop-blur-2xl bg-black/70 border-white/10 shadow-black/50">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-white">
            {isLoginMode ? "Entrar" : "Criar Conta"}
          </h1>
          <p className="text-gray-400 font-medium text-sm">
            {isLoginMode ? "Bem-vindo de volta." : "Junte-se a nós."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold ml-3 uppercase tracking-wider text-gray-500">
              E-mail
            </label>
            <input
              type="email"
              required
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium border bg-gray-900/50 border-white/5 text-white placeholder-gray-600 focus:bg-gray-900/80 focus:border-white/30 focus:ring-1 focus:ring-white/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold ml-3 uppercase tracking-wider text-gray-500">
              Senha
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium border bg-gray-900/50 border-white/5 text-white placeholder-gray-600 focus:bg-gray-900/80 focus:border-white/30 focus:ring-1 focus:ring-white/20"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer mt-6 w-full py-4 rounded-2xl font-extrabold text-black text-lg transition-all shadow-lg bg-white hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.99] shadow-white/5"
          >
            {isLoginMode ? "Acessar" : "Cadastrar"}
          </button>
        </form>

        <div className="mt-10 text-center text-sm font-medium text-gray-500">
          {isLoginMode ? "Não tem conta?" : "Já tem cadastro?"}
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="cursor-pointer ml-2 text-white hover:text-gray-300 hover:underline transition-colors font-bold"
          >
            {isLoginMode ? "Criar agora." : "Entrar."}
          </button>
        </div>
      </div>
    </div>
  );
}
