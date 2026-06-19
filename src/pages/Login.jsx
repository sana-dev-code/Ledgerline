import { useState } from "react";
import { useApp } from "../hooks/useApp";

export default function Login({ go }) {
  const { state, dispatch } = useApp();
  const [email, setEmail] = useState("admin@ledgerline.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return setError("Email and password are required.");
    }

    const user = state.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return setError("Invalid email or password.");

    dispatch({ type: "LOGIN", user });
    go("dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9fc] p-4">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid-cols-[1fr_420px]">
        <div className="hidden bg-gradient-to-br from-blue-600 via-sky-500 to-violet-500 p-10 text-white lg:block">
          <h1 className="text-4xl font-black">Ledgerline</h1>
          <p className="mt-4 max-w-md text-blue-50">
            Multi-tenant financial reporting workspace for accounting teams.
          </p>

          <div className="mt-16 grid gap-4">
            {["Client reporting", "Reconciliation", "Audit visibility"].map((x) => (
              <div key={x} className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                <p className="font-bold">{x}</p>
                <p className="mt-1 text-sm text-blue-50">
                  Secure demo workflow with role-based permissions.
                </p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="p-8 lg:p-10">
          <h2 className="text-3xl font-black text-slate-900">Sign in</h2>
          <p className="mt-2 text-sm text-slate-500">
            Use demo credentials to access the workspace.
          </p>

          <label className="mt-8 block text-sm font-bold text-slate-700">
            Email *
          </label>
          <input
            className="mt-2 w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5 block text-sm font-bold text-slate-700">
            Password *
          </label>
          <input
            type="password"
            className="mt-2 w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-sm">
            Sign In
          </button>

          
        </form>
      </section>
    </main>
  );
}