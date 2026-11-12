import {Edibility, UnderCapType, ForestType, DeadlyTwin, Mushroom} from '../components/types/mushroom';

declare const require: (path: string) => any;

export const EDIBILITY_LABELS: Record<Edibility, string> = {
  edible: 'Jadalny',
  inedible: 'Niejadalny',
  poisonous: 'Trujący',
};

export const UNDER_CAP_LABELS: Record<UnderCapType, string> = {
  pores: 'Rurki',
  gills: 'Blaszki',
  ridges: 'Żebra',
};

export const FOREST_TYPE_LABELS: Record<ForestType, string> = {
  coniferous: 'Iglasty',
  deciduous: 'Liściasty',
  mixed: 'Mieszany',
};

export const MONTH_LABELS: Record<number, string> = {
    1: 'Styczeń',
    2: 'Luty',    
    3: 'Marzec',
    4: 'Kwiecień',
    5: 'Maj',
    6: 'Czerwiec',
    7: 'Lipiec',
    8: 'Sierpień',
    9: 'Wrzesień',
    10: 'Październik',
    11: 'Listopad',
    12: 'Grudzień',
};

export const MUSHROOMS: Mushroom[] = [
    {
    id: 'borowik-szlachetny',
    name: 'Borowik szlachetny (Prawdziwek)',
    latinName: 'Boletus edulis',
    edibility: 'edible',
    underCap: 'pores',
    hasRing: false,
    forestTypes: ['coniferous', 'deciduous', 'mixed'],
    seasonMonths: [6, 7, 8, 9, 10, 11],
    capColor: 'Jasnobrązowy do ciemnobrązowego',
    description:
      'Jeden z najbardziej cenionych grzybów w Polsce o zwartym, białym miąższu i szlachetnym, orzechowym aromacie. Młode okazy mają białe rurki, które z wiekiem stają się żółtooliwkowe.',
    habitat: 'Rośnie pod świerkami, sosnami, dębami oraz bukami.',
    image: require('../../assets/images/mushrooms/borowik-szlachetny.jpg'),
    deadlyTwin: {
        name: 'Goryczak żółciowy (Szatan)',
        latinName: 'Tylopilus felleus',
        dangerLevel: 'inedible',
        howToDistinguish: [
        'Rurki goryczaka u starszych okazów stają się brudnoróżowe (u borowika oliwkowe).',
        'Na trzonie goryczaka widoczna jest ciemna, wypukła siateczka (u borowika jasna).',
        'Miąższ goryczaka jest skrajnie gorzki — jeden okaz zepsuje całe danie.',
      ],
    },
  },

];