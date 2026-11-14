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
        <Text style={styles.appTitle}>Grzybobranie</Text>
        <Text style={styles.subtitle}>
          Interaktywny atlas polskich grzybów • Tryb offline
        </Text>


        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
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
                color={COLORS.textMuted}
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


        <Text style={styles.resultsCount}>
          Znaleziono gatunków: {filteredMushrooms.length}
        </Text>
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
            <Ionicons
              name="leaf-outline"
              size={40}
              color={COLORS.textMuted}
            />
            <Text style={styles.emptyTitle}>Brak pasujących gatunków</Text>
            <Text style={styles.emptyText}>
              Spróbuj wpisać inną nazwę lub zmień kategorię filtrów.
            </Text>
            <Pressable style={styles.resetButton} onPress={resetFilters}>
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
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  appTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.sm + 4,
    height: 46,
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
    paddingVertical: SPACING.sm + 4,
  },
  resultsCount: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 1.5,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
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
