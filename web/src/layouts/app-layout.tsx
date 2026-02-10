import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export function AppLayout() {
  return (
    <div className="flex h-screen bg-white text-[#1b3556] relative overflow-hidden">
      {/* MESMOS RABISCOS DO LOGIN AQUI (OPACIDADE MENOR PARA NÃO ATRAPALHAR) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
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

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
