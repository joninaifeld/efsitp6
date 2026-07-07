import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, PostType } from '../types/types';
import { defaultUser } from '../data/defaultUser';
import { getFormattedNumber } from '../utils/helpers';

/** Ancho de la pantalla para calcular el tamaño de cada celda del grid */
const SCREEN_WIDTH = Dimensions.get('window').width;
/** Tamaño de cada imagen en el grid (3 columnas con 2px de gap) */
const IMAGE_SIZE = (SCREEN_WIDTH - 4) / 3;

/**
 * ProfileScreen - Pantalla del perfil del usuario.
 * 
 * Estructura:
 * 1. Header con username y menú
 * 2. Info del perfil: avatar, stats (posts, followers, following), bio
 * 3. Botones de acción: Editar perfil, Compartir perfil
 * 4. Grid de 3 columnas con las publicaciones del usuario
 * 
 * IMPORTANTE: El grid se implementa con FlatList + numColumns={3} según consigna.
 */
export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /**
   * Navega al detalle del post al presionar una imagen del grid
   */
  const handlePostPress = (post: PostType) => {
    navigation.navigate('PostDetail', { post });
  };

  /**
   * Renderiza el header del perfil (avatar, stats, bio).
   * Se usa como ListHeaderComponent del FlatList.
   */
  const renderProfileHeader = () => {
    return (
      <View>
        {/* ── Sección de avatar y stats ──────────────────── */}
        <View style={styles.topSection}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarRing}>
              <Image
                source={{ uri: defaultUser.userImage }}
                style={styles.avatar}
              />
            </View>
          </View>

          {/* Stats: posts, followers, following */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {defaultUser.posts.length}
              </Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {getFormattedNumber(defaultUser.followers)}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {defaultUser.following}
              </Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* ── Nombre y bio ───────────────────────────────── */}
        <View style={styles.bioSection}>
          <Text style={styles.displayName}>{defaultUser.displayName}</Text>
          <Text style={styles.bioText}>{defaultUser.bio}</Text>
        </View>

        {/* ── Botones de acción ──────────────────────────── */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Compartir perfil</Text>
          </TouchableOpacity>
        </View>

        {/* ── Separador antes del grid ───────────────────── */}
        <View style={styles.tabsSection}>
          <TouchableOpacity style={styles.activeTab}>
            <Ionicons name="grid-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons name="person-outline" size={24} color="#8E8E8E" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   * Renderiza cada imagen del grid.
   * Cada celda es cuadrada y ocupa 1/3 del ancho de la pantalla.
   */
  const renderGridItem = ({ item }: { item: PostType }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handlePostPress(item)}
      >
        <Image
          source={{ uri: item.postImage }}
          style={styles.gridImage}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header con username y menú ────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>{defaultUser.username}</Text>
          {defaultUser.verified && (
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#0095F6"
              style={styles.verifiedIcon}
            />
          )}
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="add-circle-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="menu-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── FlatList con grid de 3 columnas ───────────────── */}
      {/* 
        IMPORTANTE: numColumns={3} según consigna para lograr el grid de Instagram.
        ListHeaderComponent renderiza toda la info del perfil antes del grid.
      */}
      <FlatList
        data={defaultUser.posts}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        // Grid de 3 columnas como en Instagram
        numColumns={3}
        // Header con toda la info del perfil
        ListHeaderComponent={renderProfileHeader}
        // Gap entre imágenes
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        // Optimizaciones de rendimiento
        removeClippedSubviews={true}
        maxToRenderPerBatch={9}
      />
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },

  // ── Top section: avatar y stats ────────────────────────
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatarRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#E1306C',
    padding: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: '#AAAAAA',
    fontSize: 13,
    marginTop: 2,
  },

  // ── Bio section ────────────────────────────────────────
  bioSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  displayName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  bioText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
  },

  // ── Botones de acción ──────────────────────────────────
  actionsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#262626',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#262626',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // ── Tabs section ───────────────────────────────────────
  tabsSection: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#262626',
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#FFFFFF',
  },
  inactiveTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },

  // ── Grid de posts ──────────────────────────────────────
  gridRow: {
    // Gap de 2px entre columnas
    gap: 2,
  },
  gridImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: '#262626',
    // Gap vertical de 2px entre filas
    marginBottom: 2,
  },
});
