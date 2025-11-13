
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
  plan: DailyPlan[];
}
