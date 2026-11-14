import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';


interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}


export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const scale = useSharedValue(1);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));


  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.94, { damping: 15, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        }}
        style={[styles.chip, selected && styles.chipSelected]}
      >
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  labelSelected: {
    color: COLORS.surface,
  },
});
