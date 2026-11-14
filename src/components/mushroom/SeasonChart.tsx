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
  const chartWidth = 312;
  const chartHeight = 76;
  const slotWidth = chartWidth / 12;
  const barWidth = 18;


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kalendarz występowania (sezon zbiorów)</Text>


      <View style={styles.svgWrapper}>
        <Svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {MONTH_SHORT_LABELS.map((monthLabel, idx) => {
            const monthNumber = idx + 1;
            const isActive = seasonMonths.includes(monthNumber);
            const x = idx * slotWidth + (slotWidth - barWidth) / 2;
            const barHeight = isActive ? 38 : 16;
            const y = 46 - barHeight;


            return (
              <React.Fragment key={monthLabel}>
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={5}
                  fill={isActive ? COLORS.primary : COLORS.surfaceSubtle}
                />
                <SvgText
                  x={idx * slotWidth + slotWidth / 2}
                  y={66}
                  fontSize="10"
                  fontWeight={isActive ? '700' : '400'}
                  fill={isActive ? COLORS.primary : COLORS.textMuted}
                  textAnchor="middle"
                >
                  {monthLabel}
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
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.md,
    ...CARD_SHADOW,
  },
  heading: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  svgWrapper: {
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  legendRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xs,
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
