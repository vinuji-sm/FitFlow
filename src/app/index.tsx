import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/fitflow/button';
import { Card } from '@/components/fitflow/card';
import { Icon } from '@/components/fitflow/icon';
import { Pill } from '@/components/fitflow/pill';
import { ProgressBar } from '@/components/fitflow/progress-bar';
import { ScreenContainer } from '@/components/fitflow/screen-container';
import { StatTile } from '@/components/fitflow/stat-tile';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppData } from '@/context/app-data';
import { DAILY_FLOW_WORKOUT, MOTIVATIONAL_MESSAGES, USER_NAME, getGreeting } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const { streak, weeklyWorkoutsCompleted, weeklyWorkoutGoal, todayActivity } = useAppData();
  const greeting = useMemo(() => getGreeting(), []);
  const [motivation] = useState(
    () => MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <ThemedText type="subtitle">
            {greeting}, {USER_NAME}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Let&apos;s make today count.
          </ThemedText>
        </View>
        <View style={[styles.streakBadge, { backgroundColor: theme.primaryMuted }]}>
          <Icon name="flame.fill" size={18} color={theme.primaryDark} />
          <ThemedText type="smallBold" style={{ color: theme.primaryDark }}>
            {streak} day streak
          </ThemedText>
        </View>
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <ThemedText type="smallBold">This week&apos;s workouts</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {weeklyWorkoutsCompleted}/{weeklyWorkoutGoal}
          </ThemedText>
        </View>
        <ProgressBar progress={weeklyWorkoutsCompleted / weeklyWorkoutGoal} />
      </Card>

      <View style={styles.statsRow}>
        <StatTile icon="figure.walk" value={todayActivity.steps.toLocaleString()} label="Steps" />
        <StatTile icon="flame.fill" value={`${todayActivity.caloriesBurned}`} label="Calories" />
        <StatTile icon="clock.fill" value={`${todayActivity.workoutMinutes} min`} label="Active" />
      </View>

      <Card style={styles.dailyFlowCard}>
        <View style={styles.rowBetween}>
          <ThemedText type="smallBold" style={{ color: theme.primaryDark }}>
            DAILY FLOW
          </ThemedText>
          <Pill label="AI-Powered · Personalized" tone="primary" />
        </View>

        <ThemedText type="title" style={styles.workoutName}>
          {DAILY_FLOW_WORKOUT.name}
        </ThemedText>

        <View style={styles.metaRow}>
          <Pill label={`${DAILY_FLOW_WORKOUT.estimatedMinutes} min`} />
          <Pill label={DAILY_FLOW_WORKOUT.difficulty} />
        </View>

        <ThemedText type="small" themeColor="textSecondary">
          {DAILY_FLOW_WORKOUT.description}
        </ThemedText>

        <Button
          title="Start Workout"
          icon="figure.run"
          onPress={() => router.push('/workout')}
          style={styles.startButton}
        />
      </Card>

      <Card style={styles.motivationCard}>
        <Icon name="quote.opening" size={16} color={theme.textSecondary} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.motivationText}>
          {motivation}
        </ThemedText>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.one,
  },
  headerText: {
    gap: Spacing.half,
    flexShrink: 1,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.five,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  dailyFlowCard: {
    gap: Spacing.two,
  },
  workoutName: {
    fontSize: 26,
    lineHeight: 32,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  startButton: {
    marginTop: Spacing.one,
  },
  motivationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  motivationText: {
    flex: 1,
    fontStyle: 'italic',
  },
});
