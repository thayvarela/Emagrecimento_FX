
import React, { useState, useCallback } from 'react';
import { UserInputForm } from './components/UserInputForm.tsx';
import { PlanDisplay } from './components/PlanDisplay.tsx';
import { generatePlan } from './services/geminiService.ts';
import { WeeklyPlan, TargetShape } from './types.ts';

function App() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (weight: number, height: number, shape: TargetShape) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    
    try {
      const generatedPlan = await generatePlan(weight, height, shape);
      if (generatedPlan) {
        setPlan(generatedPlan);
      } else {
        setError('Não foi possível gerar o plano. A IA retornou uma resposta inesperada. Por favor, tente novamente.');
      }
    } catch (e) {
      setError('Ocorreu um erro ao se comunicar com a IA. Verifique sua conexão ou tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <main className="container mx-auto flex flex-col items-center justify-center space-y-8 py-10">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
            Plano de Emagrecimento com IA
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Receba um plano de dieta e treino personalizado, passo a passo, para alcançar o corpo dos seus sonhos.
          </p>
        </header>

        <UserInputForm onGenerate={handleGeneratePlan} isLoading={isLoading} />

        {error && (
          <div className="w-full max-w-2xl bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">Erro!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {plan && (
           <PlanDisplay planData={plan} />
        )}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Potencializado pela API do Google Gemini.</p>
      </footer>
    </div>
  );
}

export default App;