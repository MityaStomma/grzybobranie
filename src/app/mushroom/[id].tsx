import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { SeasonChart } from '@/components/mushroom/SeasonChart';
import { TwinWarningCard } from '@/components/mushroom/TwinWarningCard';
import { EdibilityBadge } from '@/components/ui/EdibilityBadge';
import {
  CARD_SHADOW,
  COLORS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '@/constants/theme';
import { useFavorites } from '@/context/FavoritesContext';
import {
  FOREST_TYPE_LABELS,
  getMushroomById,
  UNDER_CAP_LABELS,
} from '@/data/mushrooms';


export default function MushroomDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mushroom = typeof id === 'string' ? getMushroomById(id) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();


  if (!mushroom) {
    return (
      <View style={styles.missingBox}>
        <Text style={styles.missingText}>Nie znaleziono wybranego gatunku.</Text>
      </View>
    );
  }


  const favorite = isFavorite(mushroom.id);
  const forestsText = mushroom.forestTypes
    .map((type) => FOREST_TYPE_LABELS[type])
    .join(', ');


  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image source={mushroom.image} style={styles.heroImage} />


      <View style={styles.headerCard}>
        <View style={styles.badgeAndFavRow}>
          <EdibilityBadge edibility={mushroom.edibility} />


          <Pressable
            onPress={() => toggleFavorite(mushroom.id)}
            style={[styles.favButton, favorite && styles.favButtonActive]}
          >
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={18}
              color={favorite ? COLORS.favorite : COLORS.textPrimary}
            />
            <Text
              style={[
                styles.favButtonText,
                favorite && { color: COLORS.favorite },
              ]}
            >
              {favorite ? 'W ulubionych' : 'Dodaj do ulubionych'}
            </Text>
          </Pressable>
        </View>


        <Text style={styles.title}>{mushroom.name}</Text>
        <Text style={styles.latin}>{mushroom.latinName}</Text>


        <Text style={styles.description}>{mushroom.description}</Text>
      </View>


      <View style={styles.traitsCard}>
        <Text style={styles.sectionHeading}>Cechy rozpoznawcze</Text>


        <View style={styles.traitRow}>
          <Text style={styles.traitLabel}>Pod kapeluszem:</Text>
          <Text style={styles.traitValue}>
            {UNDER_CAP_LABELS[mushroom.underCap]}
          </Text>
        </View>


        <View style={styles.traitRow}>
          <Text style={styles.traitLabel}>Pierścień na trzonie:</Text>
          <Text style={styles.traitValue}>
            {mushroom.hasRing ? 'Tak (obecny)' : 'Brak'}
          </Text>
        </View>


        <View style={styles.traitRow}>
          <Text style={styles.traitLabel}>Barwa kapelusza:</Text>
          <Text style={styles.traitValue}>{mushroom.capColor}</Text>
        </View>


        <View style={styles.traitRow}>
          <Text style={styles.traitLabel}>Typ lasu:</Text>
          <Text style={styles.traitValue}>{forestsText}</Text>
        </View>


        <View style={[styles.traitRow, styles.lastTraitRow]}>
          <Text style={styles.traitLabel}>Występowanie:</Text>
          <Text style={styles.traitValue}>{mushroom.habitat}</Text>
        </View>
      </View>


      <SeasonChart seasonMonths={mushroom.seasonMonths} />


      {mushroom.deadlyTwin && <TwinWarningCard twin={mushroom.deadlyTwin} />}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl * 1.5,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceSubtle,
    marginBottom: SPACING.md,
  },
  headerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...CARD_SHADOW,
  },
  badgeAndFavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  favButtonActive: {
    borderColor: COLORS.poisonousBorder,
    backgroundColor: COLORS.poisonousBg,
  },
  favButtonText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: FONT_SIZE.xl - 2,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  latin: {
    fontSize: FONT_SIZE.sm,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: SPACING.sm + 4,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  traitsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.md,
    ...CARD_SHADOW,
  },
  sectionHeading: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  traitRow: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceSubtle,
  },
  lastTraitRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  traitLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  traitValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  missingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  missingText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
});
