import { Eye, LogIn, Mail, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../components/ui/input";
import { useLogin } from "../services/queries/auth";



export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const loginMutation = useLogin();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await loginMutation.mutateAsync({ email, password });
			navigate("/");
		} catch {}
	};
	return (
		<div
			className="min-h-screen flex bg-purple-900/5">
			<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
				<div
					className="absolute inset-0 gradient-brand-subtle"
					style={{ opacity: 0.6 }}
				/>
				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse 80% 60% at 30% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 70% 70%, rgba(124, 58, 237, 0.12) 0%, transparent 50%)",
					}}
				/>
				<div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
					<div className="flex items-center gap-3 mb-8">
						<div
							className="w-12 h-12 rounded-xl flex items-center justify-center glow-brand-sm"
							style={{
								background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)",
								boxShadow: "var(--shadow-glow-sm)",
							}}
						>
							<Sparkles className="w-6 h-6 text-white" />
						</div>
						<span
							className="text-xl font-semibold gradient-brand-text"
							style={{ letterSpacing: "-0.02em" }}
						>
							Neural SaaS
						</span>
					</div>
					<h1
						className="text-3xl xl:text-4xl font-bold mb-4"
						style={{
							color: "var(--text-primary)",
							letterSpacing: "-0.03em",
							lineHeight: 1.2,
						}}
					>
						Gerencie seus chatbots com inteligência
					</h1>
					<p
						className="text-lg max-w-md"
						style={{ color: "var(--text-secondary)" }}
					>
						Dashboard, métricas e integrações em um só lugar. Faça login para
						continuar.
					</p>
				</div>
			</div>

			<div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
				<div className="w-full max-w-[400px]">
					<div className="lg:hidden flex items-center justify-center gap-2 mb-8">
						<div
							className="w-10 h-10 rounded-lg flex items-center justify-center"
							style={{
								background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)",
							}}
						>
							<Sparkles className="w-5 h-5 text-white" />
						</div>
						<span className="text-lg font-semibold gradient-brand-text">
							Neural SaaS
						</span>
					</div>

					<div
						className="rounded-2xl p-8 sm:p-10 card-elevated"
						style={{
							background: "var(--surface-elevated)",
							border: "1px solid var(--border-default)",
							boxShadow: "var(--shadow-md)",
						}}
					>
						<div className="flex items-center gap-2 mb-2">
							<LogIn
								className="w-5 h-5"
								style={{ color: "var(--brand-indigo)" }}
							/>
							<h2
								className="text-xl font-semibold"
								style={{
									color: "var(--text-primary)",
									letterSpacing: "-0.02em",
								}}
							>
								Entrar
							</h2>
						</div>
						<p
							className="text-sm mb-6"
							style={{ color: "var(--text-tertiary)" }}
						>
							Use seu email e senha para acessar o painel.
						</p>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium mb-2"
									style={{ color: "var(--text-secondary)" }}
								>
									Email
								</label>
								<div className="relative">
									<Input
										id="email"
										type="email"
										placeholder="seu@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
                    leftIcon={<Mail className="w-4 h-4" />}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium mb-2"
									style={{ color: "var(--text-secondary)" }}
								>
									Senha
								</label>
								<div className="relative">
									<Input
										id="password"
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
                    leftIcon={<Eye className="w-4 h-4" />}
									/>
								</div>
								<a
									href="#"
									className="text-xs mt-1.5 inline-block transition-colors hover:opacity-90"
									style={{ color: "var(--brand-indigo)" }}
								>
									Esqueci a senha
								</a>
							</div>

							<button
								type="submit"
								disabled={loginMutation.isPending}
								className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60"
							>
								<LogIn className="w-4 h-4" />
								{loginMutation.isPending ? "Entrando…" : "Entrar"}
							</button>
						</form>

						<p
							className="text-center text-sm mt-6"
							style={{ color: "var(--text-tertiary)" }}
						>
							Ainda não tem conta?{" "}
							<a
								href="#"
								className="font-medium transition-colors hover:opacity-90"
								style={{ color: "var(--brand-indigo)" }}
							>
								Criar conta
							</a>
						</p>
					</div>

					<p
						className="text-center text-xs mt-6"
						style={{ color: "var(--text-tertiary)" }}
					>
						Ao entrar, você concorda com nossos Termos e Política de Privacidade.
					</p>
				</div>
			</div>
		</div>
	);
}
