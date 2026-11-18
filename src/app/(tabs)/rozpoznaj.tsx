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
              <View>
                <Text style={styles.eyebrow}>Dopasuj cechy owocnika</Text>
                <Text style={styles.title}>Co znalazłem?</Text>
              </View>
              {activeFiltersCount > 0 ? (
                <Pressable
                  onPress={resetFilters}
                  hitSlop={8}
                  style={styles.clearPill}
                >
                  <Ionicons name="refresh" size={14} color={COLORS.onPrimary} />
                  <Text style={styles.clearPillText}>Resetuj</Text>
                </Pressable>
              ) : (
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="options-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>
              )}
            </View>


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


            <Text style={styles.groupLabel}>Pod kapeluszem</Text>
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


            <Text style={styles.groupLabel}>Pierścień na trzonie</Text>
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


            <Text style={styles.groupLabel}>Środowisko (typ lasu)</Text>
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


            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>Pasujące gatunki</Text>
              <Text style={styles.matchCount}>{filteredMushrooms.length}</Text>
            </View>
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
    paddingBottom: 116,
  },
  headerBlock: {
    paddingTop: SPACING.sm + 2,
    marginBottom: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
  },
  clearPillText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
    color: COLORS.onPrimary,
  },
  safetyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.inedibleBg,
    borderWidth: 1,
    borderColor: COLORS.inedibleBorder,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
  },
  safetyText: {
    flex: 1,
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.inedibleText,
  },
  groupLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md + 2,
    marginBottom: SPACING.sm,
  },
  chipsRow: {
    gap: SPACING.sm,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  matchLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  matchCount: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
    color: COLORS.primary,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
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
    paddingVertical: SPACING.sm + 3,
    borderRadius: RADIUS.pill,
  },
  resetButtonText: {
    color: COLORS.onPrimary,
    fontWeight: '800',
    fontSize: FONT_SIZE.sm,
  },
});
