import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Href, Tabs, usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CARD_SHADOW,
  COLORS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '@/constants/theme';
import { useFavorites } from '@/context/FavoritesContext';

interface TabItem {
  key: 'index' | 'rozpoznaj' | 'ulubione';
  href: Href;
  matchPath: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

const TAB_ITEMS: TabItem[] = [
  {
    key: 'index',
    href: '/',
    matchPath: '/',
    label: 'Atlas',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    key: 'rozpoznaj',
    href: '/rozpoznaj',
    matchPath: '/rozpoznaj',
    label: 'Rozpoznaj',
    icon: 'search-outline',
    activeIcon: 'search',
  },
  {
    key: 'ulubione',
    href: '/ulubione',
    matchPath: '/ulubione',
    label: 'Ulubione',
    icon: 'heart-outline',
    activeIcon: 'heart',
  },
];

function FloatingPillTabBar({ favoriteCount }: { favoriteCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.outerWrapper,
        { bottom: Math.max(insets.bottom, SPACING.md) },
      ]}
    >
      <View style={styles.dock}>
        {TAB_ITEMS.map((tab) => {
          const isFocused =
            tab.matchPath === '/'
              ? pathname === '/' || pathname === '/index'
              : pathname.startsWith(tab.matchPath);
          const showBadge = tab.key === 'ulubione' && favoriteCount > 0;

          if (isFocused) {
            return (
              <Pressable
                key={tab.key}
                onPress={() => router.navigate(tab.href)}
                style={styles.activePill}
              >
                <View style={styles.activeIconCircle}>
                  <Ionicons
                    name={tab.activeIcon}
                    size={19}
                    color={COLORS.onPrimary}
                  />
                </View>
                <Text style={styles.activeLabel} numberOfLines={1}>
                  {showBadge ? `${tab.label} (${favoriteCount})` : tab.label}
                </Text>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={tab.key}
              onPress={() => router.navigate(tab.href)}
              style={styles.inactiveCircle}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={COLORS.textSecondary}
              />
              {showBadge && (
                <View style={styles.badgeDot}>
                  <Text style={styles.badgeDotText}>{favoriteCount}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { favoriteIds } = useFavorites();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={() => null}
      >
        <Tabs.Screen name="index" options={{ title: 'Atlas' }} />
        <Tabs.Screen name="rozpoznaj" options={{ title: 'Rozpoznaj' }} />
        <Tabs.Screen name="ulubione" options={{ title: 'Ulubione' }} />
      </Tabs>

      <FloatingPillTabBar favoriteCount={favoriteIds.length} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  outerWrapper: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    alignItems: 'center',
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.pill,
    padding: 6,
    borderWidth: 1,
    borderColor: '#2E402C',
    gap: SPACING.sm,
    ...CARD_SHADOW,
  },
  activePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#253523',
    borderRadius: RADIUS.pill,
    padding: 4,
    paddingRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    gap: SPACING.sm + 2,
  },
  activeIconCircle: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLabel: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.primary,
  },
  inactiveCircle: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDotText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.onPrimary,
  },
});