import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

/**
 * Bottom Tab Navigator principal.
 * 
 * Pestañas:
 * - Home: Feed con stories y posts
 * - Search: Placeholder (no implementado en esta versión)
 * - Reels: Placeholder (no implementado)
 * - Shop: Placeholder (no implementado)
 * - Profile: Perfil del usuario con grid de posts
 */
const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Sin header porque cada pantalla renderiza su propio header
        headerShown: false,
        // Estilo de la barra de pestañas
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#262626',
          borderTopWidth: 1,
          height: 50,
          paddingBottom: 5,
        },
        // Color de los íconos activos e inactivos
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#8E8E8E',
        // Sin labels, solo íconos como en Instagram
        tabBarShowLabel: false,
      }}
    >
      {/* Home - Feed principal */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Search - Placeholder */}
      <Tab.Screen
        name="Search"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Reels - Placeholder */}
      <Tab.Screen
        name="Reels"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Shop - Placeholder */}
      <Tab.Screen
        name="Shop"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Profile - Perfil del usuario */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Componente placeholder para pestañas no implementadas
 */
function PlaceholderScreen() {
  return null;
}
