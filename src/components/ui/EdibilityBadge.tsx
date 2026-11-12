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
    text: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  edible: {
    bg: COLORS.edibleBg,
    text: COLORS.edibleText,
    icon: 'checkmark-circle',
  },
  inedible: {
    bg: COLORS.inedibleBg,
    text: COLORS.inedibleText,
    icon: 'remove-circle',
  },
  poisonous: {
    bg: COLORS.poisonousBg,
    text: COLORS.poisonousText,
    icon: 'warning',
  },
};


export function EdibilityBadge({ edibility }: EdibilityBadgeProps) {
  const config = BADGE_CONFIG[edibility];


  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Ionicons name={config.icon} size={14} color={config.text} />
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
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
  },
});
