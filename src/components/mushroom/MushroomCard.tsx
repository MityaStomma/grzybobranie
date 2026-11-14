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


  const handleOpenDetails = () => {
    router.push({
      pathname: '../../app/mushroom/[id]',
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
        <Image source={mushroom.image} style={styles.thumbnail} />


        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={1}>
              {mushroom.name}
            </Text>
            <Pressable
              onPress={() => toggleFavorite(mushroom.id)}
              hitSlop={10}
              accessibilityLabel="Dodaj do ulubionych"
            >
              <Ionicons
                name={favorite ? 'heart' : 'heart-outline'}
                size={22}
                color={favorite ? COLORS.favorite : COLORS.textMuted}
              />
            </Pressable>
          </View>


          <Text style={styles.latinName} numberOfLines={1}>
            {mushroom.latinName}
          </Text>


          <View style={styles.footerRow}>
            <EdibilityBadge edibility={mushroom.edibility} />
            <Text style={styles.traitText}>
              {UNDER_CAP_LABELS[mushroom.underCap]}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 4,
    marginBottom: SPACING.sm + 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...CARD_SHADOW,
  },
  thumbnail: {
    width: 78,
    height: 78,
    borderRadius: RADIUS.sm + 2,
    backgroundColor: COLORS.surfaceSubtle,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    flex: 1,
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
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  traitText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
