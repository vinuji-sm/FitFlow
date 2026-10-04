import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/fitflow/avatar';
import { Card } from '@/components/fitflow/card';
import { Icon } from '@/components/fitflow/icon';
import { ProgressBar } from '@/components/fitflow/progress-bar';
import { ScreenContainer } from '@/components/fitflow/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppData } from '@/context/app-data';
import { WEEKLY_CHALLENGE } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

export default function CommunityScreen() {
  const theme = useTheme();
  const { posts, toggleLike } = useAppData();

  return (
    <ScreenContainer>
      <ThemedText type="subtitle">Community</ThemedText>

      <Card style={styles.challengeCard}>
        <View style={styles.rowBetween}>
          <View style={styles.challengeIcon}>
            <Icon name="trophy.fill" size={18} color={theme.primaryDark} />
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {WEEKLY_CHALLENGE.participants} joined
          </ThemedText>
        </View>
        <ThemedText type="smallBold">{WEEKLY_CHALLENGE.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {WEEKLY_CHALLENGE.description}
        </ThemedText>
        <ProgressBar progress={WEEKLY_CHALLENGE.progress} />
      </Card>

      {posts.map((post) => (
        <Card key={post.id}>
          <View style={styles.postHeader}>
            <Avatar initials={post.initials} color={post.avatarColor} />
            <View style={styles.postHeaderText}>
              <ThemedText type="smallBold">{post.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {post.timeAgo}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="default">{post.text}</ThemedText>

          <View style={styles.postFooter}>
            <Pressable onPress={() => toggleLike(post.id)} style={styles.footerAction}>
              <Icon
                name={post.liked ? 'heart.fill' : 'heart'}
                size={18}
                color={post.liked ? theme.danger : theme.textSecondary}
              />
              <ThemedText type="small" themeColor="textSecondary">
                {post.likes}
              </ThemedText>
            </Pressable>

            <View style={styles.footerAction}>
              <Icon name="bubble.left" size={18} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">
                {post.comments}
              </ThemedText>
            </View>
          </View>
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeCard: {
    gap: Spacing.one,
  },
  challengeIcon: {
    width: 32,
    height: 32,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  postHeaderText: {
    gap: Spacing.half,
  },
  postFooter: {
    flexDirection: 'row',
    gap: Spacing.four,
    marginTop: Spacing.one,
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
});
