import React from 'react';
import { WeeklyPlan } from '../types.ts';

interface SavedPlansProps {
  plans: WeeklyPlan[];
  onViewPlan: (plan: WeeklyPlan) => void;
}

export const SavedPlans: React.FC<SavedPlansProps> = ({ plans, onViewPlan }) => {
  if (plans.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700 text-center">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Meus Planos Salvos</h2>
        <p className="text-slate-400">Você ainda não salvou nenhum plano.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-slate-700">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Meus Planos Salvos</h2>
      <div className="space-y-4">
        {plans.sort((a, b) => b.createdAt - a.createdAt).map((plan) => (
          <div key={plan.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-200">
                Plano para Objetivo: <span className="text-emerald-400">{plan.userInput.shape}</span>
              </p>
              <p className="text-sm text-slate-400">
                Criado em: {new Date(plan.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <button 
              onClick={() => onViewPlan(plan)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
