import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/fitflow/button';
import { Card } from '@/components/fitflow/card';
import { Icon } from '@/components/fitflow/icon';
import { ProgressBar } from '@/components/fitflow/progress-bar';
import { ScreenContainer } from '@/components/fitflow/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppData } from '@/context/app-data';
import { SAMPLE_FOODS } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';
import type { MealSlot } from '@/types/fitflow';

const MEAL_SLOTS: { key: MealSlot; label: string }[] = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
];

export default function NutritionScreen() {
  const theme = useTheme();
  const { nutrition, nutritionGoals, addMeal, addWater } = useAppData();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<MealSlot>('breakfast');
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);

  const totals = useMemo(() => {
    const allMeals = [...nutrition.meals.breakfast, ...nutrition.meals.lunch, ...nutrition.meals.dinner];
    return allMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [nutrition.meals]);

  const openAddMeal = () => {
    setSelectedFoodId(null);
    setModalVisible(true);
  };

  const confirmAddMeal = () => {
    const food = SAMPLE_FOODS.find((item) => item.id === selectedFoodId);
    if (!food) return;
    addMeal(selectedSlot, food);
    setModalVisible(false);
  };

  const handleScan = () => {
    Alert.alert(
      'Scan Meal',
      'Camera-based food logging is a proposed FitFlow feature. This prototype only demonstrates the UI entry point.'
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <ThemedText type="subtitle">Nutrition</ThemedText>
        <Pressable
          onPress={handleScan}
          style={({ pressed }) => [
            styles.scanButton,
            { backgroundColor: theme.primaryMuted, opacity: pressed ? 0.8 : 1 },
          ]}>
          <Icon name="camera.viewfinder" size={20} color={theme.primaryDark} />
        </Pressable>
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <ThemedText type="smallBold">Calories</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {totals.calories} / {nutritionGoals.calorieTarget}
          </ThemedText>
        </View>
        <ProgressBar progress={totals.calories / nutritionGoals.calorieTarget} />
        <ThemedText type="small" themeColor="textSecondary">
          {Math.max(nutritionGoals.calorieTarget - totals.calories, 0)} cal remaining
        </ThemedText>
      </Card>

      <Card>
        <ThemedText type="smallBold">Macros</ThemedText>
        <MacroRow label="Protein" consumed={totals.protein} target={nutritionGoals.proteinTarget} color={theme.primary} />
        <MacroRow label="Carbs" consumed={totals.carbs} target={nutritionGoals.carbsTarget} color={theme.warning} />
        <MacroRow label="Fat" consumed={totals.fat} target={nutritionGoals.fatTarget} color={theme.danger} />
      </Card>

      <Card>
        <View style={styles.rowBetween}>
          <ThemedText type="smallBold">Water Intake</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {nutrition.water} / {nutritionGoals.waterTarget} glasses
          </ThemedText>
        </View>
        <View style={styles.waterRow}>
          {Array.from({ length: nutritionGoals.waterTarget }).map((_, index) => (
            <Icon
              key={index}
              name="drop.fill"
              size={22}
              color={index < nutrition.water ? theme.primary : theme.backgroundSelected}
            />
          ))}
        </View>
        <Button title="Add Glass" variant="outline" icon="plus" onPress={addWater} />
      </Card>

      {MEAL_SLOTS.map(({ key, label }) => (
        <Card key={key}>
          <ThemedText type="smallBold">{label}</ThemedText>
          {nutrition.meals[key].length === 0 ? (
            <ThemedText type="small" themeColor="textSecondary">
              No meals logged yet.
            </ThemedText>
          ) : (
            nutrition.meals[key].map((meal) => (
              <View key={meal.id} style={styles.mealRow}>
                <View style={styles.mealText}>
                  <ThemedText type="default">{meal.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {meal.addedAt}
                  </ThemedText>
                </View>
                <ThemedText type="smallBold">{meal.calories} cal</ThemedText>
              </View>
            ))
          )}
        </Card>
      ))}

      <Button title="Add Meal" icon="plus.circle.fill" onPress={openAddMeal} />

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <SafeAreaView style={[styles.modalSheet, { backgroundColor: theme.background }]} edges={['bottom']}>
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle">Add Meal</ThemedText>
              <Pressable onPress={() => setModalVisible(false)}>
                <Icon name="xmark" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}>
              <View style={styles.slotRow}>
                {MEAL_SLOTS.map(({ key, label }) => (
                  <Pressable
                    key={key}
                    onPress={() => setSelectedSlot(key)}
                    style={[
                      styles.slotChip,
                      {
                        backgroundColor: selectedSlot === key ? theme.primary : theme.backgroundSelected,
                      },
                    ]}>
                    <ThemedText
                      type="smallBold"
                      style={{ color: selectedSlot === key ? '#FFFFFF' : theme.textSecondary }}>
                      {label}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>

              <View style={styles.foodList}>
                {SAMPLE_FOODS.map((food) => (
                  <Pressable
                    key={food.id}
                    onPress={() => setSelectedFoodId(food.id)}
                    style={[
                      styles.foodRow,
                      {
                        borderColor: selectedFoodId === food.id ? theme.primary : theme.border,
                        backgroundColor: selectedFoodId === food.id ? theme.primaryMuted : theme.backgroundElement,
                      },
                    ]}>
                    <View style={styles.mealText}>
                      <ThemedText type="default">{food.name}</ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {food.protein}g protein · {food.carbs}g carbs · {food.fat}g fat
                      </ThemedText>
                    </View>
                    <ThemedText type="smallBold">{food.calories} cal</ThemedText>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            <Button
              title="Add to Today"
              onPress={confirmAddMeal}
              disabled={!selectedFoodId}
              style={styles.confirmButton}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

function MacroRow({
  label,
  consumed,
  target,
  color,
}: {
  label: string;
  consumed: number;
  target: number;
  color: string;
}) {
  return (
    <View style={styles.macroRow}>
      <View style={styles.rowBetween}>
        <ThemedText type="small">{label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {consumed}g / {target}g
        </ThemedText>
      </View>
      <ProgressBar progress={consumed / target} color={color} height={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroRow: {
    gap: Spacing.one,
  },
  waterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },
  mealText: {
    flex: 1,
    gap: Spacing.half,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  slotChip: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  foodList: {
    gap: Spacing.two,
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalScrollContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.two,
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
  },
  confirmButton: {
    marginTop: Spacing.one,
  },
});
