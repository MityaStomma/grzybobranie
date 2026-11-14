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
        <Text style={styles.title}>Ulubione gatunki</Text>
        <View style={styles.offlinePill}>
          <Ionicons
            name="cloud-offline-outline"
            size={14}
            color={COLORS.primary}
          />
          <Text style={styles.offlineText}>
            Zapisano lokalnie w pamięci telefonu (100% offline)
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
          <View style={styles.emptyBox}>
            <Ionicons
              name="heart-dislike-outline"
              size={44}
              color={COLORS.textMuted}
            />
            <Text style={styles.emptyTitle}>
              Twój koszyk ulubionych jest jeszcze pusty
            </Text>
            <Text style={styles.emptyText}>
              Kliknij ikonę serduszka przy wybranym grzybie w Atlasie, aby mieć
              do niego szybki dostęp w lesie bez zasięgu.
            </Text>
            <Pressable
              style={styles.browseButton}
              onPress={() => router.navigate('/')}
            >
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
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm + 4,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  offlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.xs + 2,
  },
  offlineText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 1.8,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
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
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 4,
    borderRadius: RADIUS.pill,
  },
  browseButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
});
