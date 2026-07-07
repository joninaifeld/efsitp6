import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/types';
import { getFormattedNumber } from '../utils/helpers';

/** Alto de la pantalla para el scroll */
const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * PostDetailScreen - Pantalla de detalle de un post (modal).
 * 
 * Estructura:
 * 1. Header con username y botón de cerrar
 * 2. Imagen del post en alta definición
 * 3. Sección de info: likes, caption
 * 4. Lista de comentarios (ScrollView)
 * 5. Barra de acciones: like, comentar, compartir, guardar
 * 6. Input para agregar comentario
 * 
 * El botón de like es interactivo y actualiza el contador en tiempo real usando useState.
 */
export default function PostDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PostDetail'>>();
  
  // El post viene como parámetro de navegación
  const { post } = route.params;

  // ── Estado local del like ─────────────────────────────
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);

  /** Alterna el estado del like y actualiza el contador */
  const handleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikesCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  return (
    // SafeAreaView para evitar colisión con notches
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header con botón de cerrar ──────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: post.userImage }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerUsername}>{post.username}</Text>
            <Text style={styles.headerLocation}>{post.location}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* KeyboardAvoidingView para que el input no quede oculto bajo el teclado */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* ── Contenido scrolleable ───────────────────────── */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Imagen del post */}
          <Image
            source={{ uri: post.postImage }}
            style={styles.postImage}
            resizeMode="contain"
          />

          {/* ── Barra de acciones ───────────────────────────── */}
          <View style={styles.actionsBar}>
            <View style={styles.actionsLeft}>
              <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                <Ionicons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={28}
                  color={liked ? '#FF3B5C' : '#FFFFFF'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={26} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="paper-plane-outline" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setSaved((prev) => !prev)}>
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={26}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* ── Likes y caption ─────────────────────────────── */}
          <View style={styles.infoSection}>
            <Text style={styles.likesText}>
              {getFormattedNumber(likesCount)} Me gusta
            </Text>
            <Text style={styles.captionText}>
              <Text style={styles.captionUsername}>{post.username}</Text>
              {'  '}
              {post.caption}
            </Text>
            <Text style={styles.timeText}>Hace {post.year}</Text>
          </View>

          {/* ── Sección de comentarios ─────────────────────── */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comentarios</Text>

            {post.comments.length === 0 ? (
              <View style={styles.noCommentsContainer}>
                <Text style={styles.noCommentsText}>
                  Sin comentarios todavía.
                </Text>
                <Text style={styles.noCommentsSubtext}>
                  Sé el primero en comentar.
                </Text>
              </View>
            ) : (
              post.comments.map((comment, index) => (
                <View key={index} style={styles.commentItem}>
                  <Image
                    source={{ uri: comment.userImage }}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentText}>
                      <Text style={styles.commentUsername}>
                        {comment.username}
                      </Text>
                      {'  '}
                      {comment.text}
                    </Text>
                    <View style={styles.commentFooter}>
                      <Text style={styles.commentTime}>Hace 1d</Text>
                      <Text style={styles.commentLikes}>
                        {comment.likes} Me gusta
                      </Text>
                      <TouchableOpacity>
                        <Text style={styles.commentReply}>Responder</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="heart-outline" size={14} color="#8E8E8E" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>

        {/* ── Input para agregar comentario ─────────────────── */}
        <View style={styles.addCommentSection}>
          <Image
            source={{ uri: post.userImage }}
            style={styles.inputAvatar}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Agrega un comentario..."
            placeholderTextColor="#8E8E8E"
          />
          <TouchableOpacity>
            <Text style={styles.postButton}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
  },

  // ── Header ─────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#262626',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerUsername: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  headerLocation: {
    color: '#8E8E8E',
    fontSize: 12,
  },

  // ── Scroll view ────────────────────────────────────────
  scrollView: {
    flex: 1,
  },
  postImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#1A1A1A',
  },

  // ── Acciones ───────────────────────────────────────────
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },

  // ── Info: likes y caption ──────────────────────────────
  infoSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#262626',
  },
  likesText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
  },
  captionText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  captionUsername: {
    fontWeight: '700',
  },
  timeText: {
    color: '#8E8E8E',
    fontSize: 12,
    marginTop: 8,
  },

  // ── Comentarios ────────────────────────────────────────
  commentsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  commentsTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 16,
  },
  noCommentsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noCommentsText: {
    color: '#AAAAAA',
    fontSize: 15,
    marginBottom: 4,
  },
  noCommentsSubtext: {
    color: '#8E8E8E',
    fontSize: 13,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
  },
  commentUsername: {
    fontWeight: '700',
  },
  commentFooter: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  commentTime: {
    color: '#8E8E8E',
    fontSize: 12,
  },
  commentLikes: {
    color: '#8E8E8E',
    fontSize: 12,
  },
  commentReply: {
    color: '#8E8E8E',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Input de comentario ────────────────────────────────
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#262626',
    backgroundColor: '#000000',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 8,
  },
  postButton: {
    color: '#0095F6',
    fontWeight: '700',
    fontSize: 14,
  },
});
