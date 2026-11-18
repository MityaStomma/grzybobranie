import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import {
  CARD_SHADOW,
  COLORS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '@/constants/theme';
import { MONTH_SHORT_LABELS } from '@/data/mushrooms';


interface SeasonChartProps {
  seasonMonths: number[];
}


export function SeasonChart({ seasonMonths }: SeasonChartProps) {
  const chartWidth = 336;
  const chartHeight = 64;
  const slotWidth = chartWidth / 12;
  const pillWidth = 24;
  const pillHeight = 54;


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Kalendarz zbiorów</Text>
        <Text style={styles.countBadge}>
          {seasonMonths.length} mies. w roku
        </Text>
      </View>


      <View style={styles.svgWrapper}>
        <Svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {MONTH_SHORT_LABELS.map((monthLabel, idx) => {
            const monthNumber = idx + 1;
            const isActive = seasonMonths.includes(monthNumber);
            const x = idx * slotWidth + (slotWidth - pillWidth) / 2;
            const centerX = idx * slotWidth + slotWidth / 2;
            const numText = String(monthNumber).padStart(2, '0');


            return (
              <React.Fragment key={monthLabel}>
                <Rect
                  x={x}
                  y={5}
                  width={pillWidth}
                  height={pillHeight}
                  rx={12}
                  fill={isActive ? COLORS.primary : COLORS.surfaceSubtle}
                />
                <SvgText
                  x={centerX}
                  y={25}
                  fontSize="8.5"
                  fontWeight={isActive ? '700' : '500'}
                  fill={isActive ? COLORS.onPrimary : COLORS.textSecondary}
                  textAnchor="middle"
                >
                  {monthLabel}
                </SvgText>
                <SvgText
                  x={centerX}
                  y={44}
                  fontSize="10"
                  fontWeight={isActive ? '800' : '600'}
                  fill={isActive ? COLORS.onPrimary : COLORS.textMuted}
                  textAnchor="middle"
                >
                  {numText}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>


      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
          <Text style={styles.legendText}>Sezon zbiorów</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.dot, { backgroundColor: COLORS.surfaceSubtle }]}
          />
          <Text style={styles.legendText}>Poza sezonem</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.md,
    ...CARD_SHADOW,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  heading: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  countBadge: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.primary,
  },
  svgWrapper: {
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  legendRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xs + 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.pill,
  },
  legendText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
});
