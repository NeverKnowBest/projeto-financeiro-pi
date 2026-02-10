import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export function AppLayout() {
  return (
    <div className="flex h-screen bg-white text-[#1b3556] relative overflow-hidden">
      {/* Riscos de fundo (os mesmos do login para manter a identidade) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="absolute top-[5%] right-[5%] w-64 h-32"
          viewBox="0 0 200 100"
        >
          <path
            d="M10,50 Q50,10 90,50 T170,50"
            fill="transparent"
            stroke="#1b3556"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
