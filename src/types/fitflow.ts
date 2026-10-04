import type { SFSymbol } from 'sf-symbols-typescript';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  target: string;
}

export interface DailyWorkout {
  name: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  description: string;
  warmup: { name: string; duration: string };
  exercises: Exercise[];
  estimatedCalories: number;
}

export interface SampleFood {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

export interface MealEntry extends SampleFood {
  addedAt: string;
}

export interface NutritionGoals {
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  waterTarget: number;
}

export interface CommunityPost {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  timeAgo: string;
  text: string;
  likes: number;
  liked: boolean;
  comments: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: SFSymbol;
  earned: boolean;
}

export interface TodayActivity {
  steps: number;
  stepsGoal: number;
  caloriesBurned: number;
  caloriesGoal: number;
  workoutMinutes: number;
  workoutMinutesGoal: number;
}
