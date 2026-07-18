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
  ownStory: Story;
}

export default function StoriesBar({ stories, ownStory }: StoriesBarProps) {
  // la story propia va primera
  const allStories: Story[] = [ownStory, ...stories];

  const renderStory = ({ item, index }: { item: Story; index: number }) => {
    const isOwnStory = index === 0 && item.isOwn;

    return (
      <TouchableOpacity style={styles.storyContainer} activeOpacity={0.8}>
        <View
          style={[
            styles.storyRing,
            // borde verde para close friends, rosa para el resto, gris para la propia
            item.isCloseFriend
              ? styles.storyRingCloseFriend
              : styles.storyRingNormal,
            isOwnStory && styles.storyRingOwn,
          ]}
        >
          <Image
            source={{ uri: item.userImage }}
            style={styles.storyAvatar}
          />
          {/* botón + para agregar story */}
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
      keyExtractor={(item, index) => `story-${item.username}-${index}`}
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

  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 68,
  },
  storyRing: {
    // anillo exterior que rodea el avatar
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
    borderColor: '#E1306C',
  },
  storyRingCloseFriend: {
    // verde para close friends
    borderColor: '#4CAF50',
  },
  storyRingOwn: {
    // sin borde de color para la story propia
    borderColor: '#3A3A3A',
  },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#262626',
  },
  addButtonContainer: {
    // botón + posicionado sobre la imagen
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
