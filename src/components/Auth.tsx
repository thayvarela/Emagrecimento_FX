import React, { useState } from 'react';
import * as authService from '../services/authService.ts';
import { User } from '../types.ts';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const user = authService.login(email, password);
        onLoginSuccess(user);
      } else {
        const user = authService.register(email, password);
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">{isLogin ? 'Login' : 'Cadastro'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg"
        >
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </button>

        <p className="text-center text-sm text-slate-400">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-semibold text-cyan-400 hover:underline ml-1">
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
      </form>
       <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-slate-800/50 px-2 text-slate-400">Ou continue com</span>
          </div>
        </div>
        <div>
            <button
                type="button"
                className="w-full flex justify-center items-center gap-3 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md"
                onClick={() => setError('Login com Google não implementado nesta simulação.')}
            >
                <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 398.4 0 256S110.3 0 244 0c69.9 0 130.2 28.1 174.3 72.8l-67.4 64.9C333.1 114.1 292.5 95.5 244 95.5 159.3 95.5 90.5 163.4 90.5 256s68.8 160.5 153.5 160.5c90.4 0 125.6-58.2 130.4-89.5H244v-83.3h239.1c4.7 25.4 7.9 52.8 7.9 82.8z"></path>
                </svg>
                Google
            </button>
        </div>
    </div>
  );
};
