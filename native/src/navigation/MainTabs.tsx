import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { MainTabParamList } from '../types/types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#262626',
          borderTopWidth: 1,
          height: 50,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#8E8E8E',
        tabBarShowLabel: false,
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <Path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <Path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </Svg>
          ),
        }}
      />

      {/* Search */}
      <Tab.Screen
        name="Search"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <Path d="M21 21l-6 -6" />
            </Svg>
          ),
        }}
        listeners={{ tabPress: (e) => e.preventDefault() }}
      />

      {/* Reels */}
      <Tab.Screen
        name="Reels"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
              <Path d="M10 9l5 3l-5 3l0 -6" />
            </Svg>
          ),
        }}
        listeners={{ tabPress: (e) => e.preventDefault() }}
      />

      {/* Shop */}
      <Tab.Screen
        name="Shop"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" />
              <Path d="M9 11v-5a3 3 0 0 1 6 0v5" />
            </Svg>
          ),
        }}
        listeners={{ tabPress: (e) => e.preventDefault() }}
      />

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <Path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <Path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </Svg>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function PlaceholderScreen() {
  return null;
}
