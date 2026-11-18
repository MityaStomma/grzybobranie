import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { EdibilityBadge } from '@/components/ui/EdibilityBadge';
import {
  CARD_SHADOW,
  COLORS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '@/constants/theme';
import { useFavorites } from '@/context/FavoritesContext';
import { UNDER_CAP_LABELS } from '@/data/mushrooms';
import { Mushroom } from '@/types/mushroom';


interface MushroomCardProps {
  mushroom: Mushroom;
  index: number;
}


export function MushroomCard({ mushroom, index }: MushroomCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(mushroom.id);
  const scale = useSharedValue(1);


  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));


  const ringColor =
    mushroom.edibility === 'edible'
      ? COLORS.primary
      : mushroom.edibility === 'poisonous'
        ? COLORS.poisonousText
        : COLORS.inedibleText;


  const handleOpenDetails = () => {
    router.push({
      pathname: '/mushroom/[id]',
      params: { id: mushroom.id },
    });
  };


  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 8) * 45).duration(280)}
      style={animatedCardStyle}
    >
      <Pressable
        onPress={handleOpenDetails}
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 16, stiffness: 260 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 16, stiffness: 260 });
        }}
        style={styles.card}
      >
        <View style={[styles.avatarWrapper, { borderColor: ringColor }]}>
          <Image source={mushroom.image} style={styles.thumbnail} />
        </View>


        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title} numberOfLines={1}>
                {mushroom.name}
              </Text>
              <Text style={styles.latinName} numberOfLines={1}>
                {mushroom.latinName}
              </Text>
            </View>


            <Pressable
              onPress={() => toggleFavorite(mushroom.id)}
              hitSlop={10}
              accessibilityLabel="Dodaj do ulubionych"
              style={[styles.heartCircle, favorite && styles.heartCircleActive]}
            >
              <Ionicons
                name={favorite ? 'heart' : 'heart-outline'}
                size={18}
                color={favorite ? COLORS.onPrimary : COLORS.textSecondary}
              />
            </Pressable>
          </View>


          <View style={styles.footerRow}>
            <EdibilityBadge edibility={mushroom.edibility} />
            <View style={styles.traitPill}>
              <Text style={styles.traitText}>
                {UNDER_CAP_LABELS[mushroom.underCap]}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={14}
                color={COLORS.textMuted}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 6,
    marginBottom: SPACING.sm + 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...CARD_SHADOW,
  },
  avatarWrapper: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.pill,
    borderWidth: 2,
    padding: 2,
    backgroundColor: COLORS.surfaceSubtle,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.pill,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  latinName: {
    fontSize: FONT_SIZE.xs,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  heartCircle: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartCircleActive: {
    backgroundColor: COLORS.primary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm + 2,
  },
  traitPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  traitText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
