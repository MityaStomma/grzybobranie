import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { EDIBILITY_LABELS } from '@/data/mushrooms';
import { Edibility } from '@/types/mushroom';


interface EdibilityBadgeProps {
  edibility: Edibility;
}


const BADGE_CONFIG: Record<
  Edibility,
  {
    bg: string;
    border: string;
    text: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  edible: {
    bg: COLORS.edibleBg,
    border: COLORS.edibleBorder,
    text: COLORS.edibleText,
    icon: 'checkmark-circle',
  },
  inedible: {
    bg: COLORS.inedibleBg,
    border: COLORS.inedibleBorder,
    text: COLORS.inedibleText,
    icon: 'remove-circle',
  },
  poisonous: {
    bg: COLORS.poisonousBg,
    border: COLORS.poisonousBorder,
    text: COLORS.poisonousText,
    icon: 'warning',
  },
};


export function EdibilityBadge({ edibility }: EdibilityBadgeProps) {
  const config = BADGE_CONFIG[edibility];


  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.bg, borderColor: config.border },
      ]}
    >
      <Ionicons name={config.icon} size={13} color={config.text} />
      <Text style={[styles.label, { color: config.text }]}>
        {EDIBILITY_LABELS[edibility]}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm + 3,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  label: {
    fontSize: FONT_SIZE.xs - 1,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
