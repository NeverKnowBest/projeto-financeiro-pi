import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export function Login() {
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCPF(value.substring(0, 14));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const cleanCPF = cpf.replace(/\D/g, "");

    const promise = axios.post("http://localhost:3333/login", {
      cpf: cleanCPF,
      password,
    });

    toast.promise(promise, {
      loading: "Autenticando...",
      success: (response) => {
        setTimeout(() => navigate("/inicio"), 1500);
        return `Bem-vindo, ${response.data.name}!`;
      },
      error: (err) => err.response?.data?.message || "Erro ao conectar.",
    });
  }

  return (
    // Fundo da página agora é branco puro
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
      {/* --- ELEMENTOS DE RISCOS DE LÁPIS (BACKGROUND) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Risco Azul */}
        <svg
          className="absolute top-[10%] left-[5%] w-64 h-32 rotate-12"
          viewBox="0 0 200 100"
        >
          <path
            d="M10,50 Q50,10 90,50 T170,50"
            fill="transparent"
            stroke="#1b3556"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5,5"
          />
        </svg>
        {/* Risco Amarelo/Dourado */}
        <svg
          className="absolute bottom-[20%] right-[10%] w-80 h-40 -rotate-12"
          viewBox="0 0 200 100"
        >
          <path
            d="M20,80 C50,20 150,20 180,80"
            fill="transparent"
            stroke="#facc15"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {/* Risco Vermelho Suave */}
        <svg
          className="absolute top-[60%] left-[15%] w-48 h-24 rotate-45"
          viewBox="0 0 100 50"
        >
          <path
            d="M5,25 L95,25"
            fill="transparent"
            stroke="#f87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="10,4"
          />
        </svg>
        {/* Risco Verde */}
        <svg
          className="absolute top-[20%] right-[20%] w-56 h-28 -rotate-45"
          viewBox="0 0 100 50"
        >
          <path
            d="M10,10 Q50,90 90,10"
            fill="transparent"
            stroke="#4ade80"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* ----------------------------------------------- */}

      <Toaster position="top-right" richColors />

      {/* Card Azul Marinho (#1b3556) mantido conforme você gostou */}
      <div className="w-full max-w-md p-10 rounded-[32px] shadow-[0_20px_50px_rgba(27,53,86,0.3)] relative z-10 border border-white/10 bg-[#1b3556]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-white">
            Entrar
          </h1>
          <p className="text-blue-100/60 font-medium text-sm">
            Seu planejamento financeiro começa aqui
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold ml-3 uppercase tracking-wider text-blue-200/70">
              CPF
            </label>
            <input
              type="text"
              required
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCPFChange}
              className="w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium border bg-white/10 border-white/20 text-white placeholder-white/30 focus:bg-white/20 focus:border-white/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold ml-3 uppercase tracking-wider text-blue-200/70">
              Senha
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium border bg-white/10 border-white/20 text-white placeholder-white/30 focus:bg-white/20 focus:border-white/50"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer mt-4 w-full py-4 rounded-2xl font-extrabold text-[#1b3556] text-lg transition-all shadow-lg bg-white hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.98]"
          >
            Acessar Conta
          </button>
        </form>
      </div>
    </div>
  );
}
