import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PostType } from '../types/types';
import { getFormattedNumber } from '../utils/helpers';

/** Ancho de la pantalla para que la imagen del post ocupe el 100% */
const SCREEN_WIDTH = Dimensions.get('window').width;

interface PostCardProps {
  data: PostType;
  /** Callback que se ejecuta al presionar la imagen o el caption para ir al detalle */
  onPress: (post: PostType) => void;
}

/**
 * Componente PostCard - Tarjeta individual de publicación del feed.
 * 
 * Props:
 * - data: Objeto PostType con toda la información del post
 * - onPress: Función que navega al detalle del post
 * 
 * Estado local:
 * - liked: si el usuario le dio like al post
 * - likesCount: contador de likes que se actualiza en tiempo real con useState
 * - saved: si el usuario guardó el post
 */
export default function PostCard({ data, onPress }: PostCardProps) {
  // Estado del botón de like - permite interacción en tiempo real
  const [liked, setLiked] = useState(false);
  // Estado del contador de likes - se incrementa/decrementa según el estado de 'liked'
  const [likesCount, setLikesCount] = useState(data.likes);
  // Estado del guardado del post
  const [saved, setSaved] = useState(false);

  /** Alterna el like y actualiza el contador inmediatamente en pantalla */
  const handleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      // Si se está dando like, sumar 1; si se está quitando, restar 1
      setLikesCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  return (
    <View style={styles.container}>
      {/* ── Header del post: avatar, username, localización ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Avatar del usuario con borde de story */}
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: data.userImage }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.username}>{data.username}</Text>
            <Text style={styles.location}>{data.location}</Text>
          </View>
        </View>
        {/* Botón de opciones del post */}
        <TouchableOpacity hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* ── Imagen principal del post ── */}
      {/* Al presionarla, navega al detalle del post */}
      <TouchableOpacity activeOpacity={0.95} onPress={() => onPress(data)}>
        <Image
          source={{ uri: data.postImage }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* ── Barra de acciones: like, comentar, compartir, guardar ── */}
      <View style={styles.actionsBar}>
        <View style={styles.actionsLeft}>
          {/* Botón de like con estado visual dinámico */}
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={26}
              color={liked ? '#FF3B5C' : '#FFFFFF'}
            />
          </TouchableOpacity>

          {/* Botón de comentarios - navega al detalle */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onPress(data)}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Botón de compartir (directo) */}
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Botón de guardar - alineado a la derecha */}
        <TouchableOpacity onPress={() => setSaved((prev) => !prev)}>
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* ── Info: likes y caption ── */}
      <View style={styles.infoContainer}>
        {/* Contador de likes que se actualiza en tiempo real */}
        <Text style={styles.likesText}>
          {getFormattedNumber(likesCount)} Me gusta
        </Text>

        {/* Caption del post - al presionar va al detalle */}
        <TouchableOpacity onPress={() => onPress(data)}>
          <Text style={styles.caption} numberOfLines={2}>
            <Text style={styles.captionUsername}>{data.username}</Text>
            {'  '}
            {data.caption}
          </Text>
        </TouchableOpacity>

        {/* Link para ver todos los comentarios */}
        <TouchableOpacity onPress={() => onPress(data)}>
          <Text style={styles.viewComments}>
            Ver los {data.comments.length} comentarios
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Fondo negro como en Instagram dark mode
    backgroundColor: '#000000',
    marginBottom: 8,
  },

  // ── Header ──────────────────────────────────────────────
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
    // Borde de story (gradiente simulado con color sólido)
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

  // ── Imagen del post ────────────────────────────────────
  postImage: {
    width: SCREEN_WIDTH,
    // Relación de aspecto 1:1 para mantener el cuadrado de Instagram
    height: SCREEN_WIDTH,
  },

  // ── Barra de acciones ──────────────────────────────────
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

  // ── Info: likes y caption ──────────────────────────────
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
