import { WeeklyPlan } from '../types.ts';

const PLANS_KEY = 'fitness_app_plans';

// Helper to get all plans from localStorage
const getAllPlans = (): Record<string, WeeklyPlan[]> => {
  const plans = localStorage.getItem(PLANS_KEY);
  return plans ? JSON.parse(plans) : {};
};

// Helper to save all plans to localStorage
const saveAllPlans = (plans: object) => {
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
};


export const savePlan = (userId: string, plan: WeeklyPlan) => {
  const allPlans = getAllPlans();
  const userPlans = allPlans[userId] || [];
  
  // Avoid saving duplicates
  if (!userPlans.some(p => p.id === plan.id)) {
    userPlans.push(plan);
    allPlans[userId] = userPlans;
    saveAllPlans(allPlans);
  }
};

export const getPlans = (userId: string): WeeklyPlan[] => {
  const allPlans = getAllPlans();
  return allPlans[userId] || [];
};
