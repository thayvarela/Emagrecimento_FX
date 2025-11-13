
import React, { useState } from 'react';
import { WeeklyPlan, DailyPlan } from '../types';
import CutleryIcon from './icons/CutleryIcon';
import DumbbellIcon from './icons/DumbbellIcon';

interface PlanDisplayProps {
  planData: WeeklyPlan;
}

const DayCard: React.FC<{ dayPlan: DailyPlan }> = ({ dayPlan }) => (
    <div className="space-y-8">
        <div>
            <h3 className="flex items-center text-2xl font-semibold mb-4 text-emerald-400">
                <CutleryIcon className="mr-3 h-6 w-6" />
                Plano de Refeições
            </h3>
            <div className="space-y-4">
                {dayPlan.meals.map((meal, index) => (
                    <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <p className="font-bold text-slate-300">{meal.time}</p>
                        <p className="text-slate-400">{meal.description}</p>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <h3 className="flex items-center text-2xl font-semibold mb-4 text-amber-400">
                <DumbbellIcon className="mr-3 h-6 w-6" />
                Plano de Treinos
            </h3>
            <div className="space-y-4">
                 {dayPlan.workouts.length > 0 ? dayPlan.workouts.map((workout, index) => (
                    <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <p className="font-bold text-slate-300">{workout.time}</p>
                        <p className="text-slate-400 whitespace-pre-wrap">{workout.description}</p>
                    </div>
                )) : (
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <p className="font-bold text-slate-300">Descanso</p>
                        <p className="text-slate-400">Hoje é dia de descanso para recuperação muscular.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ planData }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-slate-700 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Seu Plano Semanal Personalizado</h2>
        <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex space-x-2 md:justify-center">
                {planData.plan.map((dayPlan, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveDayIndex(index)}
                        className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-200 whitespace-nowrap ${
                            activeDayIndex === index
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                        }`}
                    >
                        {dayPlan.day}
                    </button>
                ))}
            </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-xl">
            {planData.plan[activeDayIndex] && <DayCard dayPlan={planData.plan[activeDayIndex]} />}
        </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a global style if possible
// For this single-file setup, we'll rely on a simple keyframe in the main App or here.
// But since we cannot add CSS files, we can fake it with Tailwind classes on the main element.
// In App.tsx, we can add a simple style tag if needed or just use animation classes.
// The `animate-fade-in` class is a placeholder for a custom animation. We can define this in `index.html` style tag or rely on a framework like `framer-motion` if allowed.
// For simplicity, let's assume `animate-fade-in` is defined.
