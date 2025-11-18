import React from 'react';
import BrainCircuitIcon from './icons/BrainCircuitIcon.tsx';
import ClipboardListIcon from './icons/ClipboardListIcon.tsx';
import TargetIcon from './icons/TargetIcon.tsx';


interface HomePageProps {
    onNavigateToAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToAuth }) => {
    return (
        <div className="w-full flex flex-col items-center text-center">
            <header className="mb-12">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
                    Plano de Emagrecimento com IA
                </h1>
                <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                    Transforme seu corpo com um plano de dieta e treino <span className="text-white font-semibold">100% personalizado</span>, criado pela inteligência artificial do Google.
                </p>
                <button 
                    onClick={onNavigateToAuth}
                    className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 text-lg"
                >
                    Começar Agora
                </button>
            </header>

            <section className="w-full max-w-5xl">
                <h2 className="text-3xl font-bold text-white mb-8">Por que funciona?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <div className="flex justify-center mb-4">
                           <BrainCircuitIcon className="h-12 w-12 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Inteligência Artificial</h3>
                        <p className="text-slate-400">Utilizamos o poder do Gemini para analisar seus dados e criar um plano otimizado para seus objetivos.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <div className="flex justify-center mb-4">
                            <TargetIcon className="h-12 w-12 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Totalmente Personalizado</h3>
                        <p className="text-slate-400">Seu plano é único. Leva em conta seu peso, altura, idade e o formato de corpo que você deseja alcançar.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <div className="flex justify-center mb-4">
                           <ClipboardListIcon className="h-12 w-12 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Completo e Detalhado</h3>
                        <p className="text-slate-400">Receba o que comer e como treinar, todos os dias da semana, com descrições claras e horários sugeridos.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
