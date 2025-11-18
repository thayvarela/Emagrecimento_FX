export enum TargetShape {
  Slim = "Emagrecer",
  Toned = "Definir",
  Athletic = "Atlético",
  Muscular = "Musculoso",
}

export interface Meal {
  time: string;
  description: string;
}

export interface Workout {
  time: string;
  description: string;
}

export interface DailyPlan {
  day: string;
  meals: Meal[];
  workouts: Workout[];
}

export interface WeeklyPlan {
  id: string;
  plan: DailyPlan[];
  createdAt: number;
  userInput: {
    weight: number;
    height: number;
    age: number;
    shape: TargetShape;
  }
}

export interface User {
  id: string;
  email: string;
}
