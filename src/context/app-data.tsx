import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import {
  ACHIEVEMENTS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_TODAY_ACTIVITY,
  NUTRITION_GOALS,
} from '@/data/mock-data';
import type { MealEntry, MealSlot, SampleFood, TodayActivity } from '@/types/fitflow';

interface NutritionState {
  meals: Record<MealSlot, MealEntry[]>;
  water: number;
}

const INITIAL_NUTRITION: NutritionState = {
  meals: {
    breakfast: [
      { id: 'seed-1', name: 'Oatmeal & Banana', calories: 320, protein: 10, carbs: 58, fat: 6, addedAt: '7:30 AM' },
    ],
    lunch: [
      { id: 'seed-2', name: 'Grilled Chicken & Rice', calories: 540, protein: 42, carbs: 55, fat: 12, addedAt: '12:45 PM' },
    ],
    dinner: [],
  },
  water: 3,
};

interface AppDataContextValue {
  streak: number;
  weeklyWorkoutsCompleted: number;
  weeklyWorkoutGoal: number;
  todayActivity: TodayActivity;
  workoutCompletedToday: boolean;
  totalWorkoutsCompleted: number;
  totalWorkoutMinutes: number;
  totalCaloriesBurned: number;
  nutrition: NutritionState;
  nutritionGoals: typeof NUTRITION_GOALS;
  posts: typeof INITIAL_COMMUNITY_POSTS;
  achievements: typeof ACHIEVEMENTS;
  completeWorkout: (minutes: number, calories: number) => void;
  addMeal: (slot: MealSlot, food: SampleFood) => void;
  addWater: () => void;
  toggleLike: (postId: string) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [streak, setStreak] = useState(5);
  const [weeklyWorkoutsCompleted, setWeeklyWorkoutsCompleted] = useState(3);
  const weeklyWorkoutGoal = 5;
  const [todayActivity, setTodayActivity] = useState<TodayActivity>(INITIAL_TODAY_ACTIVITY);
  const [workoutCompletedToday, setWorkoutCompletedToday] = useState(false);
  const [totalWorkoutsCompleted, setTotalWorkoutsCompleted] = useState(42);
  const [totalWorkoutMinutes, setTotalWorkoutMinutes] = useState(1260);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(18400);
  const [nutrition, setNutrition] = useState<NutritionState>(INITIAL_NUTRITION);
  const [posts, setPosts] = useState(INITIAL_COMMUNITY_POSTS);
  const [achievements] = useState(ACHIEVEMENTS);

  const completeWorkout = useCallback(
    (minutes: number, calories: number) => {
      setTodayActivity((prev) => ({
        ...prev,
        workoutMinutes: prev.workoutMinutes + minutes,
        caloriesBurned: prev.caloriesBurned + calories,
      }));
      setTotalWorkoutsCompleted((prev) => prev + 1);
      setTotalWorkoutMinutes((prev) => prev + minutes);
      setTotalCaloriesBurned((prev) => prev + calories);

      if (!workoutCompletedToday) {
        setWorkoutCompletedToday(true);
        setStreak((prev) => prev + 1);
        setWeeklyWorkoutsCompleted((prev) => Math.min(prev + 1, weeklyWorkoutGoal));
      }
    },
    [workoutCompletedToday]
  );

  const addMeal = useCallback((slot: MealSlot, food: SampleFood) => {
    const entry: MealEntry = {
      ...food,
      id: `${food.id}-${Date.now()}`,
      addedAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };
    setNutrition((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [slot]: [...prev.meals[slot], entry],
      },
    }));
  }, []);

  const addWater = useCallback(() => {
    setNutrition((prev) => ({ ...prev, water: prev.water + 1 }));
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  }, []);

  const value = useMemo<AppDataContextValue>(
    () => ({
      streak,
      weeklyWorkoutsCompleted,
      weeklyWorkoutGoal,
      todayActivity,
      workoutCompletedToday,
      totalWorkoutsCompleted,
      totalWorkoutMinutes,
      totalCaloriesBurned,
      nutrition,
      nutritionGoals: NUTRITION_GOALS,
      posts,
      achievements,
      completeWorkout,
      addMeal,
      addWater,
      toggleLike,
    }),
    [
      streak,
      weeklyWorkoutsCompleted,
      todayActivity,
      workoutCompletedToday,
      totalWorkoutsCompleted,
      totalWorkoutMinutes,
      totalCaloriesBurned,
      nutrition,
      posts,
      achievements,
      completeWorkout,
      addMeal,
      addWater,
      toggleLike,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
