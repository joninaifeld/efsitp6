import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

// Mantiene el splash screen visible hasta que la app esté lista
// En web puede fallar silenciosamente, así que lo envolvemos en try/catch
try {
  SplashScreen.preventAutoHideAsync();
} catch (_) {}

export default function App() {
  useEffect(() => {
    // Oculta el splash screen una vez que el componente montó
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    // SafeAreaProvider necesario para que SafeAreaView funcione en toda la app
    <SafeAreaProvider>
      {/* NavigationContainer es el contenedor raíz de toda la navegación */}
      <NavigationContainer>
        {/* StatusBar en modo light para contrastar con el header oscuro */}
        <StatusBar style="light" backgroundColor="#000000" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
