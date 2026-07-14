import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PostType } from '../types/types';
import { getFormattedNumber } from '../utils/helpers';

interface PostCardProps {
  data: PostType;
  onPress: (post: PostType) => void;
}

export default function PostCard({ data, onPress }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.likes);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikesCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: data.userImage }} style={styles.avatar} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.username}>{data.username}</Text>
            <Text style={styles.location}>{data.location}</Text>
          </View>
        </View>
        {/* dots-vertical */}
        <TouchableOpacity hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <Path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* ── Imagen ── */}
      <TouchableOpacity activeOpacity={0.95} onPress={() => onPress(data)}>
        <Image source={{ uri: data.postImage }} style={styles.postImage} resizeMode="contain" />
      </TouchableOpacity>

      {/* ── Acciones ── */}
      <View style={styles.actionsBar}>
        <View style={styles.actionsLeft}>
          {/* heart filled / outline */}
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            {liked ? (
              <Svg width={26} height={26} viewBox="0 0 24 24" fill="#FF3B5C">
                <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <Path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
              </Svg>
            ) : (
              <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <Path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </Svg>
            )}
          </TouchableOpacity>

          {/* message-circle */}
          <TouchableOpacity style={styles.actionButton} onPress={() => onPress(data)}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
            </Svg>
          </TouchableOpacity>

          {/* send */}
          <TouchableOpacity style={styles.actionButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M10 14l11 -11" />
              <Path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* bookmark filled / outline */}
        <TouchableOpacity onPress={() => setSaved((prev) => !prev)}>
          {saved ? (
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="#FFFFFF">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z" />
            </Svg>
          ) : (
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" />
            </Svg>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Info ── */}
      <View style={styles.infoContainer}>
        <Text style={styles.likesText}>{getFormattedNumber(likesCount)} Me gusta</Text>
        <TouchableOpacity onPress={() => onPress(data)}>
          <Text style={styles.caption} numberOfLines={2}>
            <Text style={styles.captionUsername}>{data.username}</Text>
            {'  '}
            {data.caption}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(data)}>
          <Text style={styles.viewComments}>Ver los {data.comments.length} comentarios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E1306C',
    padding: 2,
    marginRight: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  headerInfo: {
    justifyContent: 'center',
  },
  username: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  location: {
    color: '#AAAAAA',
    fontSize: 11,
    marginTop: 1,
  },
  postImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#111111',
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 14,
  },
  infoContainer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  likesText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 4,
  },
  caption: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  captionUsername: {
    fontWeight: '700',
  },
  viewComments: {
    color: '#8E8E8E',
    fontSize: 13,
    marginTop: 2,
  },
});
