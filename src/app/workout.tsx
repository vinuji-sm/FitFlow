import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/fitflow/button';
import { Card } from '@/components/fitflow/card';
import { Icon } from '@/components/fitflow/icon';
import { Pill } from '@/components/fitflow/pill';
import { ScreenContainer } from '@/components/fitflow/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppData } from '@/context/app-data';
import { DAILY_FLOW_WORKOUT } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

type WorkoutStep =
  | { kind: 'warmup'; name: string; detail: string }
  | { kind: 'exercise'; name: string; detail: string };

const STEPS: WorkoutStep[] = [
  { kind: 'warmup', name: DAILY_FLOW_WORKOUT.warmup.name, detail: DAILY_FLOW_WORKOUT.warmup.duration },
  ...DAILY_FLOW_WORKOUT.exercises.map((exercise) => ({
    kind: 'exercise' as const,
    name: exercise.name,
    detail: exercise.target,
  })),
];

export default function WorkoutScreen() {
  const theme = useTheme();
  const { completeWorkout, workoutCompletedToday } = useAppData();
  const [modalVisible, setModalVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const openWorkout = () => {
    setStepIndex(0);
    setFinished(false);
    setModalVisible(true);
  };

  const closeWorkout = () => {
    setModalVisible(false);
  };

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      completeWorkout(DAILY_FLOW_WORKOUT.estimatedMinutes, DAILY_FLOW_WORKOUT.estimatedCalories);
      setFinished(true);
    }
  };

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <ThemedText type="subtitle">Today&apos;s Workout</ThemedText>
        <Pill label="Personalized · AI-Assisted" tone="primary" />
      </View>

      <Card>
        <ThemedText type="smallBold">{DAILY_FLOW_WORKOUT.name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {DAILY_FLOW_WORKOUT.description}
        </ThemedText>
        <View style={styles.metaRow}>
          <Pill label={DAILY_FLOW_WORKOUT.difficulty} />
          <Pill label={`${DAILY_FLOW_WORKOUT.estimatedMinutes} min`} />
          <Pill label={`~${DAILY_FLOW_WORKOUT.estimatedCalories} cal`} />
        </View>
        {workoutCompletedToday && <Pill label="Completed today" tone="primary" />}
      </Card>

      <Card>
        <View style={styles.rowBetween}>
          <ThemedText type="smallBold">Warm-Up</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {DAILY_FLOW_WORKOUT.warmup.duration}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {DAILY_FLOW_WORKOUT.warmup.name}
        </ThemedText>
      </Card>

      <Card>
        <ThemedText type="smallBold">Exercises</ThemedText>
        <View style={styles.exerciseList}>
          {DAILY_FLOW_WORKOUT.exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseRow}>
              <View style={[styles.exerciseIndex, { backgroundColor: theme.backgroundSelected }]}>
                <ThemedText type="smallBold">{index + 1}</ThemedText>
              </View>
              <View style={styles.exerciseText}>
                <ThemedText type="default">{exercise.name}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {exercise.target}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </Card>

      <Button title="Start Workout" icon="play.fill" onPress={openWorkout} />

      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeWorkout}>
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          {!finished ? (
            <View style={styles.modalBody}>
              <ThemedText type="small" themeColor="textSecondary">
                {currentStep.kind === 'warmup' ? 'Warm-Up' : `Exercise ${stepIndex} of ${STEPS.length - 1}`}
              </ThemedText>
              <ThemedText type="title" style={styles.modalStepName}>
                {currentStep.name}
              </ThemedText>
              <ThemedText type="subtitle" style={{ color: theme.primary }}>
                {currentStep.detail}
              </ThemedText>

              <View style={styles.modalActions}>
                <Button
                  title={isLastStep ? 'Finish Workout' : 'Next'}
                  icon={isLastStep ? 'checkmark.circle.fill' : 'arrow.right'}
                  onPress={handleNext}
                />
                <Button title="Cancel" variant="ghost" onPress={closeWorkout} />
              </View>
            </View>
          ) : (
            <View style={styles.modalBody}>
              <Icon name="checkmark.circle.fill" size={64} color={theme.primary} />
              <ThemedText type="title" style={styles.modalStepName}>
                Workout Complete!
              </ThemedText>
              <ThemedText type="default" themeColor="textSecondary" style={styles.modalSummaryText}>
                Great job finishing {DAILY_FLOW_WORKOUT.name}.
              </ThemedText>
              <View style={styles.metaRow}>
                <Pill label={`${DAILY_FLOW_WORKOUT.estimatedMinutes} min`} tone="primary" />
                <Pill label={`~${DAILY_FLOW_WORKOUT.estimatedCalories} cal`} tone="primary" />
              </View>
              <Button title="Done" onPress={closeWorkout} style={styles.doneButton} />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  exerciseList: {
    gap: Spacing.two,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  exerciseIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseText: {
    flex: 1,
    gap: Spacing.half,
  },
  modalContainer: {
    flex: 1,
  },
  modalBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    gap: Spacing.three,
  },
  modalStepName: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 36,
  },
  modalSummaryText: {
    textAlign: 'center',
  },
  modalActions: {
    width: '100%',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  doneButton: {
    width: '100%',
    marginTop: Spacing.three,
  },
});
