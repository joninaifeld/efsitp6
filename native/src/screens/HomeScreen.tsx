import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, PostType, Story } from '../types/types';
import { fetchPosts, fetchStories } from '../services/catApi';
import { defaultUser } from '../data/defaultUser';
import PostCard from '../components/PostCard';
import StoriesBar from '../components/StoriesBar';

/**
 * HomeScreen - Pantalla principal del feed.
 * 
 * Estructura:
 * 1. Header con logo de Instagram + íconos de notificaciones y mensajes
 * 2. Barra de stories (StoriesBar)
 * 3. Feed de posts (FlatList optimizada)
 * 
 * Usa useEffect para traer los datos de la API al montar el componente.
 * Utiliza FlatList (OBLIGATORIO según consigna) para renderizar el feed.
 */
export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // ── Estado de los datos ───────────────────────────────
  const [posts, setPosts] = useState<PostType[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * useEffect: fetch de datos al montar el componente.
   * Se ejecuta una sola vez (deps array vacío []).
   */
  useEffect(() => {
    loadData();
  }, []);

  /**
   * Carga los posts y stories desde la API usando Axios.
   * Según la consigna, debe traer mínimo 10 elementos.
   */
  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch paralelo de posts y stories
      const [fetchedPosts, fetchedStories] = await Promise.all([
        fetchPosts(10), // Mínimo 10 posts según consigna
        fetchStories(10),
      ]);

      setPosts(fetchedPosts);
      setStories(fetchedStories);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navega a la pantalla de detalle del post.
   * Se pasa el objeto completo del post como parámetro.
   */
  const handlePostPress = (post: PostType) => {
    navigation.navigate('PostDetail', { post });
  };

  /**
   * Renderiza el header del FlatList (stories).
   * Se usa ListHeaderComponent para que scrollee junto con el feed.
   */
  const renderListHeader = () => {
    return (
      <StoriesBar stories={stories} ownStory={defaultUser.story} />
    );
  };

  /**
   * Renderiza cada item del feed usando PostCard.
   * El componente PostCard es modular y reutilizable.
   */
  const renderPost = ({ item }: { item: PostType }) => {
    return <PostCard data={item} onPress={handlePostPress} />;
  };

  return (
    // SafeAreaView evita que el contenido se superponga con notches o barras del sistema
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header de Instagram ──────────────────────────── */}
      <View style={styles.header}>
        {/* Logo de Instagram (texto) */}
        <Text style={styles.logoText}>Instagram</Text>

        {/* Íconos de la derecha: notificaciones y mensajes */}
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="paper-plane-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Feed de posts con FlatList ──────────────────── */}
      {loading ? (
        // Loading spinner mientras se cargan los datos
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          // Key único usando el ID del post
          keyExtractor={(item) => item.id}
          // Header del FlatList: barra de stories
          ListHeaderComponent={renderListHeader}
          // Optimizaciones de rendimiento
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={10}
          // Sin separadores porque los posts ya tienen su margin
          ItemSeparatorComponent={null}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  logoText: {
    // Fuente manuscrita estilo Instagram (en producción usar la fuente Billabong)
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },

  // ── Loading ────────────────────────────────────────────
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
