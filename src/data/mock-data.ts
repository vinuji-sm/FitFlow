import type {
  Achievement,
  CommunityPost,
  DailyWorkout,
  NutritionGoals,
  SampleFood,
  TodayActivity,
} from '@/types/fitflow';

export const USER_NAME = 'Alex';

export function getGreeting(date: Date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export const MOTIVATIONAL_MESSAGES = [
  'Small steps every day add up to big results.',
  'Your only competition is who you were yesterday.',
  'Consistency beats intensity. Keep showing up.',
  'Strong body, clear mind. You’ve got this.',
  'Progress, not perfection.',
];

export const INITIAL_TODAY_ACTIVITY: TodayActivity = {
  steps: 6240,
  stepsGoal: 10000,
  caloriesBurned: 310,
  caloriesGoal: 550,
  workoutMinutes: 18,
  workoutMinutesGoal: 45,
};

export const DAILY_FLOW_WORKOUT: DailyWorkout = {
  name: 'Full-Body Strength Flow',
  difficulty: 'Intermediate',
  estimatedMinutes: 30,
  estimatedCalories: 240,
  description:
    'Picked for you based on your recent activity and recovery — a balanced mix of strength and mobility to keep momentum going.',
  warmup: { name: 'Dynamic Warm-Up', duration: '5 min' },
  exercises: [
    { id: 'ex-1', name: 'Push-Ups', target: '3 sets x 12 reps' },
    { id: 'ex-2', name: 'Bodyweight Squats', target: '3 sets x 15 reps' },
    { id: 'ex-3', name: 'Plank Hold', target: '3 sets x 45 sec' },
    { id: 'ex-4', name: 'Walking Lunges', target: '3 sets x 12 reps/leg' },
  ],
};

export const NUTRITION_GOALS: NutritionGoals = {
  calorieTarget: 2200,
  proteinTarget: 140,
  carbsTarget: 240,
  fatTarget: 70,
  waterTarget: 8,
};

export const SAMPLE_FOODS: SampleFood[] = [
  { id: 'food-1', name: 'Oatmeal & Banana', calories: 320, protein: 10, carbs: 58, fat: 6 },
  { id: 'food-2', name: 'Greek Yogurt & Berries', calories: 220, protein: 18, carbs: 26, fat: 4 },
  { id: 'food-3', name: 'Grilled Chicken & Rice', calories: 540, protein: 42, carbs: 55, fat: 12 },
  { id: 'food-4', name: 'Avocado Toast', calories: 310, protein: 8, carbs: 34, fat: 16 },
  { id: 'food-5', name: 'Salmon & Veggies', calories: 480, protein: 38, carbs: 20, fat: 24 },
  { id: 'food-6', name: 'Protein Shake', calories: 180, protein: 28, carbs: 12, fat: 3 },
  { id: 'food-7', name: 'Turkey Sandwich', calories: 400, protein: 30, carbs: 42, fat: 11 },
  { id: 'food-8', name: 'Mixed Nuts', calories: 200, protein: 7, carbs: 8, fat: 17 },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    name: 'Jordan Lee',
    initials: 'JL',
    avatarColor: '#1FA355',
    timeAgo: '12m ago',
    text: 'Crushed a morning workout before work — feeling unstoppable today!',
    likes: 24,
    liked: false,
    comments: 5,
  },
  {
    id: 'post-2',
    name: 'Priya Nair',
    initials: 'PN',
    avatarColor: '#2563EB',
    timeAgo: '48m ago',
    text: 'Hit my weekly step goal three days early this week. Small habits really do compound.',
    likes: 31,
    liked: false,
    comments: 8,
  },
  {
    id: 'post-3',
    name: 'Marcus Chen',
    initials: 'MC',
    avatarColor: '#D97706',
    timeAgo: '2h ago',
    text: 'Just joined the 30-Day Mobility Challenge! Who else is in?',
    likes: 17,
    liked: false,
    comments: 3,
  },
  {
    id: 'post-4',
    name: 'Sofia Ramirez',
    initials: 'SR',
    avatarColor: '#DB2777',
    timeAgo: '5h ago',
    text: 'Meal prepped for the whole week — nutrition tracking is finally starting to feel easy.',
    likes: 42,
    liked: false,
    comments: 11,
  },
  {
    id: 'post-5',
    name: 'Diego Torres',
    initials: 'DT',
    avatarColor: '#7C3AED',
    timeAgo: 'Yesterday',
    text: 'Reached a new personal best on my 5k time. Consistency pays off.',
    likes: 58,
    liked: false,
    comments: 14,
  },
];

export const WEEKLY_CHALLENGE = {
  title: '5-Day Streak Challenge',
  description: 'Complete a workout 5 days this week to earn the badge.',
  participants: 128,
  progress: 0.6,
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: '7-Day Streak',
    description: 'Worked out 7 days in a row',
    icon: 'flame.fill',
    earned: true,
  },
  {
    id: 'ach-2',
    title: 'First Workout',
    description: 'Completed your first FitFlow session',
    icon: 'star.fill',
    earned: true,
  },
  {
    id: 'ach-3',
    title: 'Hydration Hero',
    description: 'Hit your water goal 5 days running',
    icon: 'drop.fill',
    earned: true,
  },
  {
    id: 'ach-4',
    title: 'Early Bird',
    description: 'Completed a workout before 8am',
    icon: 'bolt.fill',
    earned: false,
  },
  {
    id: 'ach-5',
    title: '50 Workouts Club',
    description: 'Completed 50 total workouts',
    icon: 'trophy.fill',
    earned: false,
  },
  {
    id: 'ach-6',
    title: 'Nutrition Novice',
    description: 'Logged meals for 7 days straight',
    icon: 'medal.fill',
    earned: false,
  },
];
