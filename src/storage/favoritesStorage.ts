import AsyncStorage from '@react-native-async-storage/async-storage';


const FAVORITES_STORAGE_KEY = '@grzybobranie:favorites';


const DEFAULT_DEMO_FAVORITES: string[] = [
  'borowik-szlachetny',
  'pieprznik-jadalny',
];


export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    if (raw === null) {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(DEFAULT_DEMO_FAVORITES)
      );
      return DEFAULT_DEMO_FAVORITES;
    }
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed;
    }
    return [];
  } catch {
    return DEFAULT_DEMO_FAVORITES;
  }
}


export async function saveFavoriteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore write errors silently in offline mode
  }
}
