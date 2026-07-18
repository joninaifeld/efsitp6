import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../types/types';
import { getFormattedNumber } from '../utils/helpers';

export default function PostDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PostDetail'>>();
  const { post } = route.params;

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikesCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: post.userImage }} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerUsername}>{post.username}</Text>
            <Text style={styles.headerLocation}>{post.location}</Text>
          </View>
        </View>
        {/* x (close) */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <Path d="M18 6l-12 12" />
            <Path d="M6 6l12 12" />
          </Svg>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        {/* FlatList maneja todo el scroll, los comentarios son los items y la imagen va en el header */}
        <FlatList
          data={post.comments}
          keyExtractor={(_, index) => `comment-${index}`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Image source={{ uri: post.postImage }} style={styles.postImage} resizeMode="contain" />

              {/* ── Acciones ── */}
              <View style={styles.actionsBar}>
                <View style={styles.actionsLeft}>
                  {/* heart */}
                  <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                    {liked ? (
                      <Svg width={28} height={28} viewBox="0 0 24 24" fill="#FF3B5C">
                        <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <Path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                      </Svg>
                    ) : (
                      <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <Path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                      </Svg>
                    )}
                  </TouchableOpacity>

                  {/* message-circle */}
                  <TouchableOpacity style={styles.actionButton}>
                    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <Path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                    </Svg>
                  </TouchableOpacity>

                  {/* send */}
                  <TouchableOpacity style={styles.actionButton}>
                    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <Path d="M10 14l11 -11" />
                      <Path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                    </Svg>
                  </TouchableOpacity>
                </View>

                {/* bookmark */}
                <TouchableOpacity onPress={() => setSaved((prev) => !prev)}>
                  {saved ? (
                    <Svg width={26} height={26} viewBox="0 0 24 24" fill="#FFFFFF">
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <Path d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z" />
                    </Svg>
                  ) : (
                    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <Path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" />
                    </Svg>
                  )}
                </TouchableOpacity>
              </View>

              {/* likes y caption */}
              <View style={styles.infoSection}>
                <Text style={styles.likesText}>{getFormattedNumber(likesCount)} Me gusta</Text>
                <Text style={styles.captionText}>
                  <Text style={styles.captionUsername}>{post.username}</Text>
                  {'  '}
                  {post.caption}
                </Text>
                <Text style={styles.timeText}>Hace {post.year}</Text>
              </View>

              {/* sección de comentarios */}
              <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>Comentarios</Text>
                {post.comments.length === 0 && (
                  <View style={styles.noCommentsContainer}>
                    <Text style={styles.noCommentsText}>Sin comentarios todavía.</Text>
                    <Text style={styles.noCommentsSubtext}>Sé el primero en comentar.</Text>
                  </View>
                )}
              </View>
            </>
          }
          renderItem={({ item: comment }) => (
            <View style={styles.commentItem}>
              <Image source={{ uri: comment.userImage }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <Text style={styles.commentText}>
                  <Text style={styles.commentUsername}>{comment.username}</Text>
                  {'  '}
                  {comment.text}
                </Text>
                <View style={styles.commentFooter}>
                  <Text style={styles.commentTime}>Hace 1d</Text>
                  <Text style={styles.commentLikes}>{comment.likes} Me gusta</Text>
                  <TouchableOpacity>
                    <Text style={styles.commentReply}>Responder</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <Path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </Svg>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.commentsList}
        />

        {/* ── Input comentario ── */}
        <View style={styles.addCommentSection}>
          <Image source={{ uri: post.userImage }} style={styles.inputAvatar} />
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
  container: { flex: 1, backgroundColor: '#000000' },
  keyboardView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#262626',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  headerUsername: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  headerLocation: { color: '#8E8E8E', fontSize: 12 },
  scrollView: { flex: 1 },
  commentsList: { paddingBottom: 16 },
  postImage: { width: '100%', height: 280, backgroundColor: '#1A1A1A' },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionsLeft: { flexDirection: 'row', alignItems: 'center' },
  actionButton: { marginRight: 16 },
  infoSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#262626',
  },
  likesText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14, marginBottom: 8 },
  captionText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20 },
  captionUsername: { fontWeight: '700' },
  timeText: { color: '#8E8E8E', fontSize: 12, marginTop: 8 },
  commentsSection: { paddingHorizontal: 16, paddingTop: 16 },
  commentsTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 16, marginBottom: 16 },
  noCommentsContainer: { alignItems: 'center', paddingVertical: 32 },
  noCommentsText: { color: '#AAAAAA', fontSize: 15, marginBottom: 4 },
  noCommentsSubtext: { color: '#8E8E8E', fontSize: 13 },
  commentItem: { flexDirection: 'row', marginBottom: 16, paddingHorizontal: 16 },
  commentAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  commentContent: { flex: 1 },
  commentText: { color: '#FFFFFF', fontSize: 13, lineHeight: 18 },
  commentUsername: { fontWeight: '700' },
  commentFooter: { flexDirection: 'row', marginTop: 8, gap: 12 },
  commentTime: { color: '#8E8E8E', fontSize: 12 },
  commentLikes: { color: '#8E8E8E', fontSize: 12 },
  commentReply: { color: '#8E8E8E', fontSize: 12, fontWeight: '600' },
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#262626',
    backgroundColor: '#000000',
  },
  inputAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  commentInput: { flex: 1, color: '#FFFFFF', fontSize: 14, paddingVertical: 8 },
  postButton: { color: '#0095F6', fontWeight: '700', fontSize: 14 },
});
