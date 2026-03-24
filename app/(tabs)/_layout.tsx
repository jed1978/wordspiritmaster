import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '@/utils/colors';
import { STRINGS } from '@/utils/strings';
import { ThemedText } from '@/components/ui/ThemedText';
import { ReviewBadge } from '@/components/explore/ReviewBadge';
import { useReviewQueue } from '@/hooks/useReviewQueue';

interface TabItemProps {
  readonly label: string;
  readonly icon: string;
  readonly focused: boolean;
  readonly badge?: number;
}

function TabItem({ label, icon, focused, badge }: TabItemProps): React.JSX.Element {
  const color = focused ? THEME.tabActive : THEME.tabInactive;
  return (
    <View style={tabStyles.item}>
      <View style={tabStyles.iconRow}>
        <ThemedText size="lg" style={{ color }}>
          {icon}
        </ThemedText>
        {badge !== undefined && badge > 0 ? (
          <View style={tabStyles.badgePos}>
            <ReviewBadge count={badge} />
          </View>
        ) : null}
      </View>
      <ThemedText size="sm" style={{ color, fontWeight: focused ? '700' : '400' }}>
        {label}
      </ThemedText>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  item: { alignItems: 'center', gap: 2 },
  iconRow: { position: 'relative' },
  badgePos: { position: 'absolute', top: -6, right: -14 },
});

export default function TabLayout(): React.JSX.Element {
  const { dueCount } = useReviewQueue();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: THEME.tabBarBg,
          borderTopColor: THEME.bgButtonBorder,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem
              icon="📖"
              label={STRINGS.tabExplore}
              focused={focused}
              badge={dueCount}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem icon="📚" label={STRINGS.tabCollection} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
