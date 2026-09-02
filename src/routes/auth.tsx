import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Yönetim Girişi — Evren Ordu" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/seo-audit" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/seo-audit` },
          });
    setBusy(false);
    if (res.error) {
      setMsg(res.error.message);
      return;
    }
    if (res.data.session) navigate({ to: "/seo-audit" });
    else setMsg("E-postanıza gönderilen bağlantı ile hesabınızı doğrulayın.");
  };

  const google = async () => {
    setMsg(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMsg("Google ile giriş başarısız oldu.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/seo-audit" });
  };

  return (
    <div className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
      <div className="w-full max-w-sm rounded-sm border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-electric">
          Yönetim Girişi
        </div>
        <h1 className="mb-6 font-display text-2xl font-light tracking-tight text-white">
          {mode === "signin" ? "Oturum açın" : "Hesap oluşturun"}
        </h1>

        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-white/15 bg-background/60 px-3 py-3 text-sm text-white outline-none focus:border-electric"
          />
          <input
            type="password"
            required
            minLength={8}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder="Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-white/15 bg-background/60 px-3 py-3 text-sm text-white outline-none focus:border-electric"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-sm bg-[oklch(0.58_0.24_255)] px-4 py-3 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[oklch(0.63_0.25_255)] disabled:opacity-60"
          >
            {busy ? "..." : mode === "signin" ? "Giriş yap" : "Kaydol"}
          </button>
        </form>

        <button
          type="button"
          onClick={google}
          className="mt-3 w-full rounded-sm border border-white/20 px-4 py-3 text-[12.5px] font-medium text-white/85 transition-colors hover:bg-white/5"
        >
          Google ile devam et
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-center text-xs text-white/55 underline-offset-4 hover:text-white hover:underline"
        >
          {mode === "signin" ? "Hesabınız yok mu? Kaydolun" : "Zaten hesabınız var mı? Giriş yapın"}
        </button>

        {msg && <p className="mt-4 text-center text-xs text-white/70">{msg}</p>}
      </div>
    </div>
  );
}
