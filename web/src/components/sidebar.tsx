import { LayoutDashboard, Wallet, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside
      className="
      group 
      flex flex-col h-screen 
      w-20 hover:w-64 
      bg-[#1b3556] text-white border-r border-white/10 
      transition-all duration-300 ease-in-out 
      overflow-hidden shadow-xl z-20
    "
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10 flex items-center whitespace-nowrap">
        <img
          src="/icon.png"
          alt="Logo"
          className="w-8 h-8 rounded shrink-0 object-contain"
        />
        <span className="ml-3 font-bold text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Money Tracker
        </span>
      </div>

      {/* Links de Navegação */}
      <nav className="flex-1 p-4 space-y-2">
        {[
          { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
          { to: "/transacoes", icon: Wallet, label: "Transações" },
          { to: "/configuracoes", icon: Settings, label: "Configurações" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-white/10 text-blue-300 shadow-inner"
                  : "hover:bg-white/5 text-blue-100/70 hover:text-white"
              }`
            }
          >
            <item.icon size={24} className="shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-white/10">
        <button className="cursor-pointer flex items-center gap-3 text-red-300 hover:text-red-100 hover:bg-red-500/10 w-full px-3 py-3 rounded-xl transition-all whitespace-nowrap">
          <LogOut size={24} className="shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
}
