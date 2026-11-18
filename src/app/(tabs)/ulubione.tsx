import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MushroomCard } from '@/components/mushroom/MushroomCard';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { useFavorites } from '@/context/FavoritesContext';
import { MUSHROOMS } from '@/data/mushrooms';
import { Mushroom } from '@/types/mushroom';


export default function UlubioneScreen() {
  const router = useRouter();
  const { favoriteIds } = useFavorites();


  const favoriteMushrooms = useMemo<Mushroom[]>(
    () => MUSHROOMS.filter((item) => favoriteIds.includes(item.id)),
    [favoriteIds]
  );


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>Kolekcja zapisana w telefonie</Text>
            <Text style={styles.title}>Ulubione gatunki</Text>
          </View>
          <View style={styles.countCircle}>
            <Text style={styles.countCircleText}>
              {favoriteMushrooms.length}
            </Text>
          </View>
        </View>


        <View style={styles.offlinePill}>
          <Ionicons
            name="cloud-offline-outline"
            size={14}
            color={COLORS.primary}
          />
          <Text style={styles.offlineText}>
            Działa w 100% offline w głębi lasu
          </Text>
        </View>
      </View>


      <FlatList
        data={favoriteMushrooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <MushroomCard mushroom={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons
                name="heart-outline"
                size={28}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>
              Twój koszyk ulubionych jest pusty
            </Text>
            <Text style={styles.emptyText}>
              Kliknij okrągłą ikonę serduszka przy wybranym grzybie w Atlasie,
              aby zapisać go w pamięci telefonu.
            </Text>
            <Pressable
              style={styles.browseButton}
              onPress={() => router.navigate('/')}
            >
              <Ionicons name="book-outline" size={18} color={COLORS.onPrimary} />
              <Text style={styles.browseButtonText}>Przejdź do Atlasu</Text>
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
    paddingBottom: SPACING.sm + 4,
  },
  topRow: {
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
  countCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countCircleText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    color: COLORS.primary,
  },
  offlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: SPACING.xs + 1,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.sm + 2,
  },
  offlineText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 116,
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
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
    fontSize: FONT_SIZE.md + 1,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg + 4,
    paddingVertical: SPACING.sm + 4,
    borderRadius: RADIUS.pill,
  },
  browseButtonText: {
    color: COLORS.onPrimary,
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
  },
});
