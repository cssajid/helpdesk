import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold">Helpdesk</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}
