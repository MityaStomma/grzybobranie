import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';
import { FavoritesProvider } from '@/context/FavoritesContext';


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: COLORS.background },
              headerTintColor: COLORS.primary,
              headerTitleStyle: {
                fontWeight: '700',
                color: COLORS.textPrimary,
              },
              headerShadowVisible: false,
              contentStyle: { backgroundColor: COLORS.background },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="mushroom/[id]"
              options={{
                title: 'Szczegóły gatunku',
                headerBackTitle: 'Wróć',
              }}
            />
          </Stack>
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
