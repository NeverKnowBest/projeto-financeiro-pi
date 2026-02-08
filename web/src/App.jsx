import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login"; // Importando a tela que criamos

export default function App() {
  return (
    // O BrowserRouter é o sistema de navegação do site
    <BrowserRouter>
      <Routes>
        {/* Dizemos: "Quando o site abrir na raiz (/), mostre o Login" */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
