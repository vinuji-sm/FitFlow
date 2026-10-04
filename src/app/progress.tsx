import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/fitflow/card';
import { Icon } from '@/components/fitflow/icon';
import { ProgressBar } from '@/components/fitflow/progress-bar';
import { ScreenContainer } from '@/components/fitflow/screen-container';
import { StatTile } from '@/components/fitflow/stat-tile';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppData } from '@/context/app-data';
import { useTheme } from '@/hooks/use-theme';

export default function ProgressScreen() {
  const theme = useTheme();
  const {
    streak,
    weeklyWorkoutsCompleted,
    weeklyWorkoutGoal,
    totalWorkoutsCompleted,
    totalWorkoutMinutes,
    totalCaloriesBurned,
    achievements,
  } = useAppData();

  return (
    <ScreenContainer>
      <ThemedText type="subtitle">Progress</ThemedText>

      <View style={styles.statsGrid}>
        <StatTile icon="flame.fill" value={`${streak}`} label="Day Streak" />
        <StatTile icon="checkmark.circle.fill" value={`${totalWorkoutsCompleted}`} label="Workouts" />
      </View>
      <View style={styles.statsGrid}>
        <StatTile icon="clock.fill" value={`${totalWorkoutMinutes}`} label="Total Minutes" />
        <StatTile icon="bolt.fill" value={`${totalCaloriesBurned.toLocaleString()}`} label="Calories Burned" />
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <ThemedText type="smallBold">This Week</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {weeklyWorkoutsCompleted}/{weeklyWorkoutGoal} workouts
          </ThemedText>
        </View>
        <ProgressBar progress={weeklyWorkoutsCompleted / weeklyWorkoutGoal} />
      </Card>

      <ThemedText type="smallBold">Achievements</ThemedText>
      <View style={styles.achievementGrid}>
        {achievements.map((achievement) => (
          <Card key={achievement.id} style={[styles.achievementCard, !achievement.earned && styles.achievementLocked]}>
            <View
              style={[
                styles.achievementIcon,
                { backgroundColor: achievement.earned ? theme.primaryMuted : theme.backgroundSelected },
              ]}>
              <Icon
                name={achievement.icon}
                size={22}
                color={achievement.earned ? theme.primaryDark : theme.textSecondary}
              />
            </View>
            <ThemedText type="smallBold">{achievement.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {achievement.description}
            </ThemedText>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  achievementCard: {
    flexBasis: '47%',
    flexGrow: 1,
  },
  achievementLocked: {
    opacity: 0.55,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
