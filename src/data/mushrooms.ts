import {
  Edibility,
  ForestType,
  Mushroom,
  UnderCapType,
} from '@/types/mushroom';


export const EDIBILITY_LABELS: Record<Edibility, string> = {
  edible: 'Jadalny',
  inedible: 'Niejadalny',
  poisonous: 'Trujący',
};


export const UNDER_CAP_LABELS: Record<UnderCapType, string> = {
  pores: 'Rurki (gąbka)',
  gills: 'Blaszki',
  ridges: 'Fałdy (listewki)',
};


export const FOREST_TYPE_LABELS: Record<ForestType, string> = {
  coniferous: 'Las iglasty',
  deciduous: 'Las liściasty',
  mixed: 'Las mieszany',
};


export const MONTH_SHORT_LABELS = [
  'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze',
  'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru',
] as const;


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
  {
    id: 'czubajka-kania',
    name: 'Czubajka kania',
    latinName: 'Macrolepiota procera',
    edibility: 'edible',
    underCap: 'gills',
    hasRing: true,
    forestTypes: ['deciduous', 'mixed'],
    seasonMonths: [7, 8, 9, 10, 11],
    capColor: 'Beżowy z brązowymi łuskami i ciemnym garbem',
    description:
      'Wysoki, okazały grzyb o parasolowatym kapeluszu pokrytym koncentrycznymi łuskami oraz smukłym, pustym w środku trzonie z zygzakowatym wzorem.',
    habitat: 'Polany leśne, obrzeża lasów, łąki i prześwietlone zagajniki.',
    image: require('../../assets/images/mushrooms/czubajka-kania.jpg'),
    deadlyTwin: {
      name: 'Muchomor sromotnikowy',
      latinName: 'Amanita phalloides',
      dangerLevel: 'poisonous',
      howToDistinguish: [
        'Kania ma ruchomy pierścień, który można przesuwać po trzonie (u muchomora jest przyrośnięty).',
        'Kania NIE posiada pochwy u podstawy trzonu (muchomor wyrasta z białej, workowatej pochwy).',
        'Kapelusz muchomora jest gładki i oliwkowozielonkawy, bez odstających brązowych łusek.',
      ],
    },
  },
  {
    id: 'pieprznik-jadalny',
    name: 'Pieprznik jadalny (Kurka)',
    latinName: 'Cantharellus cibarius',
    edibility: 'edible',
    underCap: 'ridges',
    hasRing: false,
    forestTypes: ['coniferous', 'deciduous', 'mixed'],
    seasonMonths: [6, 7, 8, 9, 10],
    capColor: 'Żółtozłocisty do pomarańczowożółtego',
    description:
      'Niezwykle popularny i trwały grzyb, którego nigdy nie atakują owady. Zamiast cienkich blaszek posiada pod kapeluszem grube, rozwidlone fałdy zbiegające na trzon.',
    habitat: 'Piaszczyste i mszyste lasy sosnowe, świerkowe oraz dębowe.',
    image: require('../../assets/images/mushrooms/pieprznik-jadalny.jpg'),
    deadlyTwin: {
      name: 'Lisówka pomarańczowa',
      latinName: 'Hygrophoropsis aurantiaca',
      dangerLevel: 'inedible',
      howToDistinguish: [
        'Lisówka ma cienkie, gęste i równe blaszki zamiast grubych fałdek.',
        'Miąższ kurki po przekrojeniu jest białawy i jędrny, a lisówki pomarańczowy i wiotki.',
        'Trzon lisówki jest cienki i często ciemniejszy u dołu.',
      ],
    },
  },
  {
    id: 'podgrzybek-brunatny',
    name: 'Podgrzybek brunatny',
    latinName: 'Imleria badia',
    edibility: 'edible',
    underCap: 'pores',
    hasRing: false,
    forestTypes: ['coniferous', 'mixed'],
    seasonMonths: [7, 8, 9, 10, 11],
    capColor: 'Kasztanowobrązowy, matowy (lepki po deszczu)',
    description:
      'Najczęściej zbierany jesienny grzyb w polskich borach sosnowych. Jego żółtawe pory pod kapeluszem wyraźnie sinieją po uciśnięciu palcem.',
    habitat: 'Bory sosnowe i świerkowe, często w kępach mchu.',
    image: require('../../assets/images/mushrooms/podgrzybek-brunatny.jpg'),
    deadlyTwin: {
      name: 'Goryczak żółciowy',
      latinName: 'Tylopilus felleus',
      dangerLevel: 'inedible',
      howToDistinguish: [
        'Pory podgrzybka sinieją po dotknięciu — u goryczaka różowieją i nie sinieją.',
        'Podgrzybek nie ma wypukłej ciemnej siateczki na trzonie.',
      ],
    },
  },
  {
    id: 'mleczaj-rydz',
    name: 'Mleczaj rydz',
    latinName: 'Lactarius deliciosus',
    edibility: 'edible',
    underCap: 'gills',
    hasRing: false,
    forestTypes: ['coniferous'],
    seasonMonths: [8, 9, 10, 11],
    capColor: 'Pomarańczowy z koncentrycznymi kręgami',
    description:
      'Szlachetny grzyb blaszkowy wydzielający po uszkodzeniu intensywnie pomarańczowe (marchwiowe) mleczko. Starsze okazy mogą nabierać zielonkawych plam.',
    habitat: 'Młode zagajniki sosnowe i trawiaste obrzeża borów iglastych.',
    image: require('../../assets/images/mushrooms/mleczaj-rydz.jpg'),
    deadlyTwin: {
      name: 'Mleczaj wełnianka',
      latinName: 'Lactarius torminosus',
      dangerLevel: 'poisonous',
      howToDistinguish: [
        'Wełnianka wydziela białe, ostro piekące mleczko (rydz — łagodne, pomarańczowe).',
        'Brzeg kapelusza wełnianki jest wyraźnie włochaty i podwinięty.',
        'Wełnianka rośnie pod brzozami, a rydz pod sosnami lub świerkami.',
      ],
    },
  },
  {
    id: 'kozlarz-babka',
    name: 'Koźlarz babka',
    latinName: 'Leccinum scabrum',
    edibility: 'edible',
    underCap: 'pores',
    hasRing: false,
    forestTypes: ['deciduous', 'mixed'],
    seasonMonths: [6, 7, 8, 9, 10],
    capColor: 'Szarobrązowy do orzechowego',
    description:
      'Charakterystyczny grzyb rurkowy o smukłym, białawym trzonie gęsto pokrytym ciemnoszarymi lub czarnymi kosmkami (łuseczkami).',
    habitat: 'Występuje wyłącznie w sąsiedztwie brzóz.',
    image: require('../../assets/images/mushrooms/kozlarz-babka.jpg'),
  },
  {
    id: 'maslak-zwyczajny',
    name: 'Maślak zwyczajny',
    latinName: 'Suillus luteus',
    edibility: 'edible',
    underCap: 'pores',
    hasRing: true,
    forestTypes: ['coniferous'],
    seasonMonths: [6, 7, 8, 9, 10, 11],
    capColor: 'Czekoladowobrązowy, silnie śluzowaty',
    description:
      'Smaczny grzyb ze śluzowatą skórką na kapeluszu, którą łatwo ściągnąć przed przygotowaniem, oraz wyraźnym fioletowobrązowym pierścieniem na trzonie.',
    habitat: 'Młodniki sosnowe i nasłonecznione bory iglaste.',
    image: require('../../assets/images/mushrooms/maslak-zwyczajny.jpg'),
  },
  {
    id: 'goryczak-zolciowy',
    name: 'Goryczak żółciowy',
    latinName: 'Tylopilus felleus',
    edibility: 'inedible',
    underCap: 'pores',
    hasRing: false,
    forestTypes: ['coniferous', 'mixed'],
    seasonMonths: [6, 7, 8, 9, 10],
    capColor: 'Jasnobrązowy, zamszowy',
    description:
      'Potocznie, choć błędnie nazywany „szatanem". Nie jest trujący, ale jego skrajnie gorzki miąższ nie traci goryczy nawet podczas długiego gotowania.',
    habitat: 'Kwaśne lasy iglaste, pod sosnami i świerkami.',
    image: require('../../assets/images/mushrooms/goryczak-zolciowy.jpg'),
    deadlyTwin: {
      name: 'Borowik szlachetny (mylony z jadalnym!)',
      latinName: 'Boletus edulis',
      dangerLevel: 'inedible',
      howToDistinguish: [
        'Zwróć uwagę na różowiejące z wiekiem pory i grubą, ciemną siateczkę na trzonie goryczaka.',
      ],
    },
  },
  {
    id: 'muchomor-sromotnikowy',
    name: 'Muchomor sromotnikowy',
    latinName: 'Amanita phalloides',
    edibility: 'poisonous',
    underCap: 'gills',
    hasRing: true,
    forestTypes: ['deciduous', 'mixed'],
    seasonMonths: [7, 8, 9, 10],
    capColor: 'Oliwkowozielony, żółtozielony lub białawy',
    description:
      'Najbardziej niebezpieczny grzyb w Europie, odpowiedzialny za większość śmiertelnych zatruć. Zawiera amanitynę niszczącą wątrobę; objawy pojawiają się z opóźnieniem (po 8–24 godzinach).',
    habitat: 'Lasy liściaste i mieszane, najczęściej pod dębami, bukami i grabami.',
    image: require('../../assets/images/mushrooms/muchomor-sromotnikowy.jpg'),
    deadlyTwin: {
      name: 'Gołąbek zielonawy / Czubajka kania',
      latinName: 'Russula virescens / Macrolepiota procera',
      dangerLevel: 'poisonous',
      howToDistinguish: [
        'Muchomor ma ZAWSZE trzy cechy naraz: białe blaszki, zwisający pierścień na trzonie oraz workowatą pochwę ukrytą u podstawy w ziemi.',
        'Gołąbek nie posiada ani pierścienia, ani pochwy, a jego trzon kruszy się jak kreda.',
      ],
    },
  },
  {
    id: 'muchomor-czerwony',
    name: 'Muchomor czerwony',
    latinName: 'Amanita muscaria',
    edibility: 'poisonous',
    underCap: 'gills',
    hasRing: true,
    forestTypes: ['coniferous', 'deciduous', 'mixed'],
    seasonMonths: [7, 8, 9, 10, 11],
    capColor: 'Jaskrawoczerwony z białymi kropkami',
    description:
      'Najbardziej rozpoznawalny grzyb trujący polskich lasów. Po ulewnych deszczach białe łatki na kapeluszu mogą zostać zmyte, przez co bywa mylony z gołąbkami.',
    habitat: 'Często w symbiozie z brzozami, sosnami i świerkami.',
    image: require('../../assets/images/mushrooms/muchomor-czerwony.jpg'),
  },
  {
    id: 'krowiak-podwiniety',
    name: 'Krowiak podwinięty (Olszówka)',
    latinName: 'Paxillus involutus',
    edibility: 'poisonous',
    underCap: 'gills',
    hasRing: false,
    forestTypes: ['coniferous', 'deciduous', 'mixed'],
    seasonMonths: [7, 8, 9, 10, 11],
    capColor: 'Oliwkowobrązowy z silnie podwiniętym brzegiem',
    description:
      'Dawniej zbierany jako jadalny, obecnie uznany za śmiertelnie niebezpieczny — zawiera antygeny wywołujące gwałtowny rozpad czerwonych krwinek, nawet po latach spożywania bez objawów.',
    habitat: 'Wilgotne lasy, parki, często pod olszami i brzozami.',
    image: require('../../assets/images/mushrooms/krowiak-podwiniety.jpg'),
  },
  {
    id: 'zaslonak-rudy',
    name: 'Zasłonak rudy',
    latinName: 'Cortinarius rubellus',
    edibility: 'poisonous',
    underCap: 'gills',
    hasRing: false,
    forestTypes: ['coniferous'],
    seasonMonths: [8, 9, 10],
    capColor: 'Rdzawobrązowy do cynamonowego ze stożkowatym garbem',
    description:
      'Śmiertelnie trujący grzyb zawierający orelaninę uszkadzającą nerki. Szczególnie zdradliwy, ponieważ pierwsze objawy zatrucia mogą wystąpić dopiero po 3 do 14 dniach od zjedzenia.',
    habitat: 'Wilgotne, mszyste bory świerkowe i sosnowe.',
    image: require('../../assets/images/mushrooms/zaslonak-rudy.jpg'),
  },
];


export function getMushroomById(id: string): Mushroom | undefined {
  return MUSHROOMS.find((mushroom) => mushroom.id === id);
}
