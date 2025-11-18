import React from 'react';
import { User } from '../types.ts';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onShowSavedPlans: () => void;
  onCreateNewPlan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onShowSavedPlans, onCreateNewPlan }) => {
  return (
    <nav className="w-full max-w-5xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-4 mb-8">
      <div className="flex justify-between items-center">
        <div className="text-slate-300">
          Bem-vindo(a), <span className="font-bold text-cyan-400">{user.email}</span>
        </div>
        <div className="flex items-center space-x-4">
            <button onClick={onCreateNewPlan} className="text-slate-300 hover:text-cyan-400 transition-colors">
                Novo Plano
            </button>
            <button onClick={onShowSavedPlans} className="text-slate-300 hover:text-cyan-400 transition-colors">
                Meus Planos
            </button>
          <button 
            onClick={onLogout} 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};
