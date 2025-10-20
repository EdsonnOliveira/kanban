import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("teste@gmail.com");
  const [password, setPassword] = useState("123");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    // Simulação de autenticação. Substituir por chamada real quando houver backend.
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#E8F2FE] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-t from-white to-[#EDF6FF] p-10">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-lg transform rotate-45">
              <Image src="/globe.svg" alt="Logo" width={48} height={48} className="rotate-[-45deg]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao Kanban</h1>
            <p className="text-sm text-gray-500 max-w-sm">
              Acesse sua conta para planejar, organizar e acompanhar seus projetos em um só lugar.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Entrar</h2>
              <p className="text-sm text-gray-500">Use suas credenciais para continuar</p>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                label="E-mail"
                placeholder="seu@email.com"
                value={email}
                onChange={setEmail}
                leftIcon={Mail}
                type="email"
              />
              <Input
                label="Senha"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                leftIcon={Lock}
                type="password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Lembrar-me
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                Esqueceu a senha?
              </button>
            </div>

            <Button
              text={isLoading ? "Entrando..." : "Entrar"}
              rightIcon={LogIn}
              rightIconClassName="text-white"
              className="mt-2"
              type="submit"
              disabled={!email || !password || isLoading}
            />

            <p className="text-center text-xs text-gray-400">
              Ao continuar, você concorda com nossos Termos e Política de Privacidade.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
