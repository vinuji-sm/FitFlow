import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PillTone = 'primary' | 'neutral' | 'warning';

type PillProps = {
  label: string;
  tone?: PillTone;
};

export function Pill({ label, tone = 'neutral' }: PillProps) {
  const theme = useTheme();

  const backgroundColor =
    tone === 'primary' ? theme.primaryMuted : tone === 'warning' ? theme.warning + '22' : theme.backgroundSelected;
  const textColor = tone === 'primary' ? theme.primaryDark : tone === 'warning' ? theme.warning : theme.textSecondary;

  return (
    <ThemedText
      type="smallBold"
      style={[styles.pill, { backgroundColor, color: textColor }]}>
      {label}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half + 2,
    borderRadius: Spacing.five,
    overflow: 'hidden',
  },
});
