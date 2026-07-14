import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Story } from '../types/types';

interface StoriesBarProps {
  stories: Story[];
  /** Historia del usuario logueado, se muestra primero con el botón + */
  ownStory: Story;
}

/**
 * Componente StoriesBar - Barra horizontal de stories del feed.
 * 
 * Usa FlatList horizontal para un scroll fluido.
 * 
 * Props:
 * - stories: Lista de stories de otros usuarios
 * - ownStory: La story del usuario logueado (siempre va primera)
 * 
 * El borde de la story cambia de color según si es close friend:
 * - Naranja/rosa: story normal (degradado simulado)
 * - Verde: close friend
 */
export default function StoriesBar({ stories, ownStory }: StoriesBarProps) {
  // Combinamos la story propia (primera) con las del resto
  const allStories: Story[] = [ownStory, ...stories];

  /**
   * Renderiza cada item de story.
   * Es una función separada para mantener el código limpio.
   */
  const renderStory = ({ item, index }: { item: Story; index: number }) => {
    const isOwnStory = index === 0 && item.isOwn;

    return (
      <TouchableOpacity style={styles.storyContainer} activeOpacity={0.8}>
        <View
          style={[
            styles.storyRing,
            // Borde verde para close friends, gradiente naranja para el resto
            item.isCloseFriend
              ? styles.storyRingCloseFriend
              : styles.storyRingNormal,
            // Sin borde para la story propia si no tiene contenido
            isOwnStory && styles.storyRingOwn,
          ]}
        >
          <Image
            source={{ uri: item.userImage }}
            style={styles.storyAvatar}
          />
          {/* Botón "+" para agregar story propia */}
          {isOwnStory && (
            <View style={styles.addButtonContainer}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#0095F6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <Circle cx="12" cy="12" r="9" />
                <Path d="M9 12h6" />
                <Path d="M12 9v6" />
              </Svg>
            </View>
          )}
        </View>
        {/* Username cortado a 8 chars para que no desborde */}
        <Text style={styles.storyUsername} numberOfLines={1}>
          {isOwnStory ? 'Tu historia' : item.username}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={allStories}
      renderItem={renderStory}
      // Cada story usa su username como key
      keyExtractor={(item, index) => `story-${item.username}-${index}`}
      // Scroll horizontal para la barra de stories
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#262626',
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },

  // ── Cada item de story ─────────────────────────────────
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 68,
  },
  storyRing: {
    // El anillo exterior que rodea el avatar
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2.5,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  storyRingNormal: {
    // Degradado de naranja a rosa (simulado con el color más característico)
    borderColor: '#E1306C',
  },
  storyRingCloseFriend: {
    // Verde para close friends
    borderColor: '#4CAF50',
  },
  storyRingOwn: {
    // Sin borde de color para la story propia
    borderColor: '#3A3A3A',
  },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#262626',
  },
  addButtonContainer: {
    // Posición absoluta del botón + sobre la imagen
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  storyUsername: {
    color: '#AAAAAA',
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
    width: 65,
  },
});
