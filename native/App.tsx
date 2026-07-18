import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

// mantiene el splash screen visible hasta que la app esté lista
try {
  SplashScreen.preventAutoHideAsync();
} catch (_) {}

export default function App() {
  useEffect(() => {
    // oculta el splash una vez que el componente montó
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#000000" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
