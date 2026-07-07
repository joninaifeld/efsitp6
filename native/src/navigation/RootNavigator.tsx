import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import MainTabs from './MainTabs';
import PostDetailScreen from '../screens/PostDetailScreen';

/**
 * Stack Navigator principal de la aplicación.
 * 
 * Estructura:
 * - MainTabs: Contiene las pestañas principales (Home, Profile, etc.)
 * - PostDetail: Pantalla modal para ver el detalle de un post
 * 
 * El PostDetail se presenta como modal para simular el comportamiento de Instagram.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        // Sin header porque cada screen tiene su propio header customizado
        headerShown: false,
      }}
    >
      {/* Pestañas principales */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      
      {/* 
        Pantalla de detalle de post.
        Se configura como modal para el efecto de presentación desde abajo.
      */}
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}
