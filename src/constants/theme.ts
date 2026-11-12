import { ViewStyle } from 'react-native';


export const COLORS = {
  background: '#F6F5F0',
  surface: '#FFFFFF',
  surfaceSubtle: '#EFECE4',
  primary: '#2D5A3C',
  primaryLight: '#E3EFE7',
  textPrimary: '#1C2621',
  textSecondary: '#5C6B62',
  textMuted: '#8A9990',
  border: '#DCE3DE',
  favorite: '#D93025',


  edibleBg: '#E6F4EA',
  edibleText: '#137333',


  inedibleBg: '#FEF7E0',
  inedibleText: '#B06000',


  poisonousBg: '#FCE8E6',
  poisonousText: '#C5221F',
  poisonousBorder: '#F5B7B1',
} as const;


export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;


export const RADIUS = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;


export const FONT_SIZE = {
xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
} as const;


export const CARD_SHADOW: ViewStyle = {
  shadowColor: '#1C2621',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
};
