import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MushroomCard } from '@/components/mushroom/MushroomCard';
import { FilterChip } from '@/components/ui/FilterChip';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { useMushroomFilter } from '@/hooks/useMushroomFilter';
import { ForestType, RingFilter, UnderCapType } from '@/types/mushroom';


const UNDER_CAP_OPTIONS: { value: 'all' | UnderCapType; label: string }[] = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'pores', label: 'Rurki (gąbka)' },
  { value: 'gills', label: 'Blaszki' },
  { value: 'ridges', label: 'Fałdy' },
];


const RING_OPTIONS: { value: RingFilter; label: string }[] = [
  { value: 'all', label: 'Dowolnie' },
  { value: 'yes', label: 'Ma pierścień' },
  { value: 'no', label: 'Bez pierścienia' },
];


const FOREST_OPTIONS: { value: 'all' | ForestType; label: string }[] = [
  { value: 'all', label: 'Każdy las' },
  { value: 'coniferous', label: 'Las iglasty' },
  { value: 'deciduous', label: 'Las liściasty' },
  { value: 'mixed', label: 'Las mieszany' },
];


export default function RozpoznajScreen() {
  const {
    filters,
    filteredMushrooms,
    activeFiltersCount,
    setUnderCap,
    setRingFilter,
    setForestType,
    resetFilters,
  } = useMushroomFilter();


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filteredMushrooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Co znalazłem?</Text>
              {activeFiltersCount > 0 && (
                <Pressable onPress={resetFilters} hitSlop={8}>
                  <Text style={styles.clearLink}>Wyczyść cechy</Text>
                </Pressable>
              )}
            </View>
            <Text style={styles.subtitle}>
              Zaznacz widoczne cechy okazu, aby zawęzić listę gatunków
            </Text>


            <View style={styles.safetyBanner}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={COLORS.inedibleText}
              />
              <Text style={styles.safetyText}>
                Nie masz 100% pewności? Zostaw grzyba w lesie!
              </Text>
            </View>


            <Text style={styles.groupLabel}>1. Pod kapeluszem:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {UNDER_CAP_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  selected={filters.underCap === opt.value}
                  onPress={() => setUnderCap(opt.value)}
                />
              ))}
            </ScrollView>


            <Text style={styles.groupLabel}>2. Pierścień na trzonie:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {RING_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  selected={filters.ringFilter === opt.value}
                  onPress={() => setRingFilter(opt.value)}
                />
              ))}
            </ScrollView>


            <Text style={styles.groupLabel}>3. Środowisko (typ lasu):</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {FOREST_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  selected={filters.forestType === opt.value}
                  onPress={() => setForestType(opt.value)}
                />
              ))}
            </ScrollView>


            <Text style={styles.matchCount}>
              Pasujące gatunki: {filteredMushrooms.length}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <MushroomCard mushroom={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Brak pasujących gatunków</Text>
            <Text style={styles.emptyText}>
              Żaden grzyb w bazie nie łączy wszystkich wybranych cech naraz.
            </Text>
            <Pressable style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Pokaż wszystkie</Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  headerBlock: {
    paddingTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  clearLink: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.favorite,
  },
  subtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  safetyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.inedibleBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.sm + 4,
  },
  safetyText: {
    flex: 1,
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.inedibleText,
  },
  groupLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs + 2,
  },
  chipsRow: {
    gap: SPACING.sm,
  },
  matchCount: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  emptyText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  resetButton: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
  },
  resetButtonText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: FONT_SIZE.sm,
  },
});
