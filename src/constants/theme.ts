import { ViewStyle } from 'react-native';


export const COLORS = {
  background: '#0B110B',
  surface: '#151E15',
  surfaceElevated: '#1B261A',
  surfaceSubtle: '#223021',


  primary: '#9EF01A',
  onPrimary: '#0A110A',
  primaryLight: 'rgba(158, 240, 26, 0.14)',
  primaryBorder: 'rgba(158, 240, 26, 0.38)',


  textPrimary: '#F4F7F3',
  textSecondary: '#9BA999',
  textMuted: '#697968',
  border: '#253424',
  favorite: '#9EF01A',


  edibleBg: 'rgba(158, 240, 26, 0.14)',
  edibleText: '#A6F425',
  edibleBorder: 'rgba(158, 240, 26, 0.34)',


  inedibleBg: 'rgba(251, 191, 36, 0.14)',
  inedibleText: '#FBBF24',
  inedibleBorder: 'rgba(251, 191, 36, 0.34)',


  poisonousBg: 'rgba(255, 92, 92, 0.14)',
  poisonousText: '#FF6B6B',
  poisonousBorder: 'rgba(255, 92, 92, 0.38)',
} as const;


export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;


export const RADIUS = {
  sm: 12,
  md: 20,
  lg: 26,
  pill: 999,
} as const;


export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
} as const;


export const CARD_SHADOW: ViewStyle = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.35,
  shadowRadius: 16,
  elevation: 6,
};
