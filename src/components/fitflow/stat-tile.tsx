import type { SFSymbol } from 'sf-symbols-typescript';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/fitflow/icon';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatTileProps = {
  icon: SFSymbol;
  value: string;
  label: string;
};

export function StatTile({ icon, value, label }: StatTileProps) {
  const theme = useTheme();

  return (
    <View style={[styles.tile, { backgroundColor: theme.backgroundSelected }]}>
      <Icon name={icon} size={20} color={theme.primary} />
      <ThemedText type="smallBold" style={styles.value}>
        {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    alignItems: 'flex-start',
    gap: Spacing.half,
  },
  value: {
    fontSize: 18,
  },
});
