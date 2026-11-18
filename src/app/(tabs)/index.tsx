import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MushroomCard } from '@/components/mushroom/MushroomCard';
import { FilterChip } from '@/components/ui/FilterChip';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { useMushroomFilter } from '@/hooks/useMushroomFilter';
import { Edibility } from '@/types/mushroom';


const EDIBILITY_OPTIONS: { value: 'all' | Edibility; label: string }[] = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'edible', label: 'Jadalne' },
  { value: 'inedible', label: 'Niejadalne' },
  { value: 'poisonous', label: 'Trujące' },
];


export default function AtlasScreen() {
  const {
    filters,
    filteredMushrooms,
    setSearchQuery,
    setEdibility,
    resetFilters,
  } = useMushroomFilter();


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.topTitleRow}>
          <View>
            <Text style={styles.eyebrow}>Przewodnik terenowy • Offline</Text>
            <Text style={styles.appTitle}>Grzybobranie</Text>
          </View>
          <View style={styles.headerBadgeCircle}>
            <Ionicons name="leaf" size={20} color={COLORS.primary} />
          </View>
        </View>


        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} />
          <TextInput
            value={filters.searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Szukaj gatunku (np. borowik, kania)..."
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {filters.searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              hitSlop={8}
              accessibilityLabel="Wyczyść wyszukiwanie"
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={COLORS.textSecondary}
              />
            </Pressable>
          )}
        </View>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {EDIBILITY_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={filters.edibility === option.value}
              onPress={() => setEdibility(option.value)}
            />
          ))}
        </ScrollView>


        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Katalog gatunków</Text>
          <Text style={styles.resultsCount}>{filteredMushrooms.length} pozycji</Text>
        </View>
      </View>


      <FlatList
        data={filteredMushrooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <MushroomCard mushroom={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="leaf-outline" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>Brak pasujących gatunków</Text>
            <Text style={styles.emptyText}>
              Spróbuj wpisać inną nazwę lub zmień kategorię filtrów.
            </Text>
            <Pressable style={styles.resetButton} onPress={resetFilters}>
              <Ionicons name="refresh" size={16} color={COLORS.onPrimary} />
              <Text style={styles.resetButtonText}>Wyczyść filtry</Text>
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
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm + 2,
    paddingBottom: SPACING.xs,
  },
  topTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  appTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  headerBadgeCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 48,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  chipsRow: {
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs + 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  resultsCount: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 116,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
