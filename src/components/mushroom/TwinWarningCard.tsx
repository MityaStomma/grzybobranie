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
  const accentColor = isDeadly ? COLORS.poisonousText : COLORS.inedibleText;
  const borderColor = isDeadly ? COLORS.poisonousBorder : COLORS.inedibleBorder;
  const badgeBg = isDeadly ? COLORS.poisonousBg : COLORS.inedibleBg;


  return (
    <View style={[styles.card, { borderColor }]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconCircle, { backgroundColor: badgeBg }]}>
          <Ionicons name="warning" size={18} color={accentColor} />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={[styles.warningTitle, { color: accentColor }]}>
            Uwaga! Możesz pomylić z:
          </Text>
          <Text style={styles.twinName}>{twin.name}</Text>
          <Text style={styles.twinLatin}>{twin.latinName}</Text>
        </View>
      </View>


      <View style={styles.divider} />


      <Text style={styles.subHeading}>Jak bezpiecznie odróżnić?</Text>
      {twin.howToDistinguish.map((point) => (
        <View key={point} style={styles.bulletRow}>
          <View style={[styles.bulletDot, { backgroundColor: accentColor }]} />
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    marginTop: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm + 4,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  warningTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  twinName: {
    fontSize: FONT_SIZE.md + 1,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  twinLatin: {
    fontSize: FONT_SIZE.xs,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm + 4,
  },
  subHeading: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs + 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm + 2,
    marginTop: 6,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: RADIUS.pill,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
