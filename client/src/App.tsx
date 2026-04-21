import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { signOut, useSession } from "./lib/auth-client";

export default function App() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold">Helpdesk</Link>
          <div className="flex items-center gap-4 text-sm">
            {isPending ? null : session?.user ? (
              <>
                <span className="text-slate-700">{session.user.name}</span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="font-medium text-slate-700 hover:text-slate-900">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Routes>
          <Route
            path="/"
            element={
              isPending ? null : session?.user ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
