import { ImageSourcePropType } from 'react-native';

export type Edibility = "edible" | "inedible" | "poisonous";
export type UnderCapType = "pores" | "gills" | "ridges";
export type ForestType = "coniferous" | "deciduous" | "mixed";

export interface DeadlyTwin {
  name: string;
  latinName: string;
  dangerLevel: "inedible" | "poisonous";
  howToDistinguish: string[];
}

export interface Mushroom {
  id: string;
  name: string;
  latinName: string;
  edibility: Edibility;
  underCap: UnderCapType;
  hasRing: boolean;
  forestTypes: ForestType[];
  seasonMonths: number[];
  capColor: string;
  description: string;
  habitat: string;
  image: ImageSourcePropType;
  deadlyTwin?: DeadlyTwin;
}

export interface MushroomFilterState {
  searchQuery: string;
  edibility: "all" | Edibility;
  underCap: "all" | UnderCapType;
  ringFilter: "all" | "yes" | "no";
  forestType: "all" | ForestType;
}

export type RingFilter = "all" | "yes" | "no";