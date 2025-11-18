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
           <button onClick={onCreateNewPlan} className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 hover:opacity-80 transition-opacity">
            Plano de Emagrecimento IA
          </button>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-slate-400 hidden md:inline">Olá, {user.email.split('@')[0]}</span>
            <button onClick={onShowSavedPlans} className="text-slate-300 hover:text-cyan-400 transition-colors px-3 py-2 rounded-md">
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
