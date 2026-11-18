import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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


interface TraitItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}


export default function MushroomDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const mushroom = typeof id === 'string' ? getMushroomById(id) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();


  if (!mushroom) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.circleBtn}>
            <Ionicons
              name="chevron-back"
              size={20}
              color={COLORS.textPrimary}
            />
          </Pressable>
          <Text style={styles.topBarTitle}>Szczegóły</Text>
          <View style={styles.circleBtnPlaceholder} />
        </View>
        <View style={styles.missingBox}>
          <Text style={styles.missingText}>
            Nie znaleziono wybranego gatunku.
          </Text>
        </View>
      </SafeAreaView>
    );
  }


  const favorite = isFavorite(mushroom.id);
  const ringColor =
    mushroom.edibility === 'edible'
      ? COLORS.primary
      : mushroom.edibility === 'poisonous'
        ? COLORS.poisonousText
        : COLORS.inedibleText;


  const forestsText = mushroom.forestTypes
    .map((type) => FOREST_TYPE_LABELS[type])
    .join(', ');


  const traitItems: TraitItem[] = [
    {
      icon: 'layers-outline',
      label: 'Pod kapeluszem',
      value: UNDER_CAP_LABELS[mushroom.underCap],
    },
    {
      icon: 'radio-button-on-outline',
      label: 'Pierścień na trzonie',
      value: mushroom.hasRing ? 'Tak (obecny)' : 'Brak pierścienia',
    },
    {
      icon: 'color-palette-outline',
      label: 'Barwa kapelusza',
      value: mushroom.capColor,
    },
    {
      icon: 'leaf-outline',
      label: 'Typ lasu',
      value: forestsText,
    },
    {
      icon: 'compass-outline',
      label: 'Występowanie',
      value: mushroom.habitat,
    },
  ];


  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={styles.circleBtn}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
        </Pressable>


        <Text style={styles.topBarTitle}>Szczegóły gatunku</Text>


        <Pressable
          onPress={() => toggleFavorite(mushroom.id)}
          hitSlop={8}
          style={[styles.circleBtn, favorite && styles.circleBtnActive]}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={20}
            color={favorite ? COLORS.onPrimary : COLORS.textPrimary}
          />
        </Pressable>
      </View>


      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={[styles.heroRing, { borderColor: ringColor }]}>
            <Image source={mushroom.image} style={styles.heroAvatar} />
          </View>


          <Text style={styles.title}>{mushroom.name}</Text>
          <Text style={styles.latin}>{mushroom.latinName}</Text>


          <View style={styles.badgeWrapper}>
            <EdibilityBadge edibility={mushroom.edibility} />
          </View>


          <Pressable
            onPress={() => toggleFavorite(mushroom.id)}
            style={[styles.favPillBtn, favorite && styles.favPillBtnActive]}
          >
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={16}
              color={favorite ? COLORS.onPrimary : COLORS.textPrimary}
            />
            <Text
              style={[
                styles.favPillText,
                favorite && styles.favPillTextActive,
              ]}
            >
              {favorite ? 'W ulubionych' : 'Dodaj do ulubionych'}
            </Text>
          </Pressable>


          <Text style={styles.description}>{mushroom.description}</Text>


          <View style={styles.traitsStack}>
            {traitItems.map((trait) => (
              <View key={trait.label} style={styles.traitRowCard}>
                <View style={styles.traitIconCircle}>
                  <Ionicons
                    name={trait.icon}
                    size={18}
                    color={COLORS.textPrimary}
                  />
                </View>
                <View style={styles.traitTextCol}>
                  <Text style={styles.traitValue}>{trait.value}</Text>
                  <Text style={styles.traitLabel}>{trait.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>


        <SeasonChart seasonMonths={mushroom.seasonMonths} />


        {mushroom.deadlyTwin && <TwinWarningCard twin={mushroom.deadlyTwin} />}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  circleBtnPlaceholder: {
    width: 42,
    height: 42,
  },
  topBarTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xl * 1.5,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#121A12',
    borderRadius: RADIUS.lg,
    padding: SPACING.md + 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...CARD_SHADOW,
  },
  heroRing: {
    width: 118,
    height: 118,
    borderRadius: RADIUS.pill,
    borderWidth: 2.5,
    padding: 3,
    backgroundColor: COLORS.surfaceSubtle,
  },
  heroAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.pill,
  },
  title: {
    fontSize: FONT_SIZE.lg + 2,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  latin: {
    fontSize: FONT_SIZE.sm,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  badgeWrapper: {
    marginTop: SPACING.sm + 2,
  },
  favPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: SPACING.sm + 4,
    paddingHorizontal: SPACING.md + 4,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  favPillBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  favPillText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  favPillTextActive: {
    color: COLORS.onPrimary,
    fontWeight: '800',
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: SPACING.md,
  },
  traitsStack: {
    width: '100%',
    gap: SPACING.sm + 2,
    marginTop: SPACING.lg,
  },
  traitRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  traitIconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitTextCol: {
    flex: 1,
  },
  traitValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  traitLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
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
