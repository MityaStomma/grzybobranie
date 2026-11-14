import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { DeadlyTwin } from '@/types/mushroom';


interface TwinWarningCardProps {
  twin: DeadlyTwin;
}


export function TwinWarningCard({ twin }: TwinWarningCardProps) {
  const isDeadly = twin.dangerLevel === 'poisonous';


  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDeadly ? COLORS.poisonousBg : COLORS.inedibleBg,
          borderColor: isDeadly ? COLORS.poisonousBorder : COLORS.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Ionicons
          name="alert-circle"
          size={22}
          color={isDeadly ? COLORS.poisonousText : COLORS.inedibleText}
        />
        <Text
          style={[
            styles.warningTitle,
            { color: isDeadly ? COLORS.poisonousText : COLORS.inedibleText },
          ]}
        >
          Uwaga! Możesz pomylić z:
        </Text>
      </View>


      <Text style={styles.twinName}>{twin.name}</Text>
      <Text style={styles.twinLatin}>{twin.latinName}</Text>


      <Text style={styles.subHeading}>Jak bezpiecznie odróżnić?</Text>
      {twin.howToDistinguish.map((point) => (
        <View key={point} style={styles.bulletRow}>
          <Text
            style={[
              styles.bulletDot,
              { color: isDeadly ? COLORS.poisonousText : COLORS.inedibleText },
            ]}
          >
            •
          </Text>
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    marginTop: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  warningTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  twinName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  twinLatin: {
    fontSize: FONT_SIZE.xs,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  subHeading: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginTop: 4,
  },
  bulletDot: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    lineHeight: 20,
  },
  bulletText: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
});
