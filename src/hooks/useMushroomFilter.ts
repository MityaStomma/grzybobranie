import { useCallback, useMemo, useState } from 'react';
import { MUSHROOMS } from '@/data/mushrooms';
import {
  Edibility,
  ForestType,
  Mushroom,
  MushroomFilterState,
  RingFilter,
  UnderCapType,
} from '@/types/mushroom';


const INITIAL_FILTER_STATE: MushroomFilterState = {
  searchQuery: '',
  edibility: 'all',
  underCap: 'all',
  ringFilter: 'all',
  forestType: 'all',
};


export function useMushroomFilter() {
  const [filters, setFilters] =
    useState<MushroomFilterState>(INITIAL_FILTER_STATE);


  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  }, []);


  const setEdibility = useCallback((edibility: 'all' | Edibility) => {
    setFilters((prev) => ({ ...prev, edibility }));
  }, []);


  const setUnderCap = useCallback((underCap: 'all' | UnderCapType) => {
    setFilters((prev) => ({ ...prev, underCap }));
  }, []);


  const setRingFilter = useCallback((ringFilter: RingFilter) => {
    setFilters((prev) => ({ ...prev, ringFilter }));
  }, []);


  const setForestType = useCallback((forestType: 'all' | ForestType) => {
    setFilters((prev) => ({ ...prev, forestType }));
  }, []);


  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);


  const filteredMushrooms = useMemo<Mushroom[]>(() => {
    const query = filters.searchQuery.trim().toLowerCase();


    return MUSHROOMS.filter((mushroom) => {
      if (query.length > 0) {
        const matchesName = mushroom.name.toLowerCase().includes(query);
        const matchesLatin = mushroom.latinName.toLowerCase().includes(query);
        if (!matchesName && !matchesLatin) {
          return false;
        }
      }


      if (
        filters.edibility !== 'all' &&
        mushroom.edibility !== filters.edibility
      ) {
        return false;
      }


      if (
        filters.underCap !== 'all' &&
        mushroom.underCap !== filters.underCap
      ) {
        return false;
      }


      if (filters.ringFilter === 'yes' && !mushroom.hasRing) {
        return false;
      }
      if (filters.ringFilter === 'no' && mushroom.hasRing) {
        return false;
      }


      if (
        filters.forestType !== 'all' &&
        !mushroom.forestTypes.includes(filters.forestType)
      ) {
        return false;
      }


      return true;
    });
  }, [filters]);


  const activeFiltersCount = useMemo<number>(() => {
    let count = 0;
    if (filters.searchQuery.trim().length > 0) count += 1;
    if (filters.edibility !== 'all') count += 1;
    if (filters.underCap !== 'all') count += 1;
    if (filters.ringFilter !== 'all') count += 1;
    if (filters.forestType !== 'all') count += 1;
    return count;
  }, [filters]);


  return {
    filters,
    filteredMushrooms,
    activeFiltersCount,
    setSearchQuery,
    setEdibility,
    setUnderCap,
    setRingFilter,
    setForestType,
    resetFilters,
  };
}
