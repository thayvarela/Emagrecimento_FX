import React, { useState, useCallback, useEffect } from 'react';
import { UserInputForm } from './components/UserInputForm.tsx';
import { PlanDisplay } from './components/PlanDisplay.tsx';
import { generatePlan } from './services/geminiService.ts';
import { WeeklyPlan, TargetShape, User } from './types.ts';
import { Auth } from './components/Auth.tsx';
import * as authService from './services/authService.ts';
import * as planService from './services/planService.ts';
import { Navbar } from './components/Navbar.tsx';
import { SavedPlans } from './components/SavedPlans.tsx';
import { HomePage } from './components/HomePage.tsx';

type View = 'home' | 'auth' | 'form' | 'plan' | 'saved_plans';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedPlans, setSavedPlans] = useState<WeeklyPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<WeeklyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      handleLoginSuccess(user);
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    const plans = planService.getPlans(user.id);
    setSavedPlans(plans);
    setView('form');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentPlan(null);
    setSavedPlans([]);
    setView('home');
  };
  
  const handleGeneratePlan = useCallback(async (weight: number, height: number, age: number, shape: TargetShape) => {
    setIsLoading(true);
    setError(null);
    setCurrentPlan(null);
    
    try {
      const generatedPlan = await generatePlan(weight, height, age, shape);
      if (generatedPlan) {
        const fullPlan: WeeklyPlan = {
          ...generatedPlan,
          id: `plan_${Date.now()}`,
          createdAt: Date.now(),
          userInput: { weight, height, age, shape },
        }
        setCurrentPlan(fullPlan);
        setView('plan');
      } else {
        setError('Não foi possível gerar o plano. A IA retornou uma resposta inesperada. Por favor, tente novamente.');
      }
    } catch (e) {
      setError('Ocorreu um erro ao se comunicar com a IA. Verifique sua conexão ou tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSavePlan = (plan: WeeklyPlan) => {
    if (!currentUser) return;
    planService.savePlan(currentUser.id, plan);
    setSavedPlans(planService.getPlans(currentUser.id));
  };
  
  const handleViewPlan = (plan: WeeklyPlan) => {
    setCurrentPlan(plan);
    setView('plan');
  }
  
  const handleShowSavedPlans = () => {
    if (!currentUser) return;
    setSavedPlans(planService.getPlans(currentUser.id));
    setView('saved_plans');
  }

  const handleCreateNewPlan = () => {
    setCurrentPlan(null);
    setView('form');
  }

  if (!process.env.API_KEY) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-gray-900 text-white p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-red-900/50 border border-red-700 text-red-300 px-6 py-8 rounded-lg text-center" role="alert">
          <h1 className="text-2xl font-bold mb-4">Erro de Configuração</h1>
          <p className="text-lg">A chave de API do Google Gemini não foi encontrada.</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!currentUser) {
       switch (view) {
        case 'auth':
          return <Auth onLoginSuccess={handleLoginSuccess} onBackToHome={() => setView('home')} />;
        case 'home':
        default:
          return <HomePage onNavigateToAuth={() => setView('auth')} />;
      }
    }
    switch (view) {
      case 'plan':
        return currentPlan && (
          <PlanDisplay 
            planData={currentPlan} 
            onSavePlan={handleSavePlan}
            isPlanSaved={savedPlans.some(p => p.id === currentPlan.id)}
          />
        );
      case 'saved_plans':
        return <SavedPlans plans={savedPlans} onViewPlan={handleViewPlan} />;
      case 'form':
      default:
        return (
          <>
            <header className="text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
                Crie seu Plano
              </h1>
              <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                Preencha seus dados para a IA gerar um plano de dieta e treino personalizado para você.
              </p>
            </header>
            <UserInputForm onGenerate={handleGeneratePlan} isLoading={isLoading} />
          </>
        );
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
       {currentUser && (
        <Navbar 
          user={currentUser} 
          onLogout={handleLogout} 
          onShowSavedPlans={handleShowSavedPlans}
          onCreateNewPlan={handleCreateNewPlan}
        />
      )}
      <main className="container mx-auto flex flex-col items-center justify-center space-y-8 py-10">
        
        {error && !isLoading && (
          <div className="w-full max-w-2xl bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">Erro!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

       {renderContent()}

      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Potencializado pela API do Google Gemini.</p>
      </footer>
    </div>
  );
}

export default App;
