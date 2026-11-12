import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { loadFavoriteIds, saveFavoriteIds } from '@/storage/favoritesStorage';


interface FavoritesContextValue {
  favoriteIds: string[];
  isLoaded: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}


const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);


export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);


  useEffect(() => {
    let isMounted = true;
    loadFavoriteIds().then((storedIds) => {
      if (isMounted) {
        setFavoriteIds(storedIds);
        setIsLoaded(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);


  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );


  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      void saveFavoriteIds(next);
      return next;
    });
  }, []);


  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isLoaded,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, isLoaded, isFavorite, toggleFavorite]
  );


  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}


export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return context;
}
