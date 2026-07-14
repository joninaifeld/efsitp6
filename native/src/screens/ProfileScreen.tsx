import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList, PostType } from '../types/types';
import { defaultUser } from '../data/defaultUser';
import { getFormattedNumber } from '../utils/helpers';

const GAP = 2;

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const CELL_SIZE = (width - GAP * 2) / 3;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePostPress = (post: PostType) => {
    navigation.navigate('PostDetail', { post });
  };

  const renderGrid = () => {
    const posts = defaultUser.posts;
    if (posts.length === 0) return null;
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => handlePostPress(item)}>
            <Image
              source={{ uri: item.postImage }}
              style={[styles.gridImage, { width: CELL_SIZE, height: CELL_SIZE }]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.gridRow}
        scrollEnabled={false}
      />
    );
  };

  const renderProfileHeader = () => (
    <View>
      {/* ── Avatar y stats ── */}
      <View style={styles.topSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarRing}>
            <Image source={{ uri: defaultUser.userImage }} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{defaultUser.posts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{getFormattedNumber(defaultUser.followers)}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{defaultUser.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* ── Nombre y bio ── */}
      <View style={styles.bioSection}>
        <Text style={styles.displayName}>{defaultUser.displayName}</Text>
        <Text style={styles.bioText}>{defaultUser.bio}</Text>
      </View>

      {/* ── Botones ── */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Compartir perfil</Text>
        </TouchableOpacity>
      </View>

      {/* ── Tabs ── */}
      <View style={styles.tabsSection}>
        {/* grid-dots */}
        <TouchableOpacity style={styles.activeTab}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <Path d="M4 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M18 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M4 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <Path d="M18 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </Svg>
        </TouchableOpacity>
        {/* user-circle */}
        <TouchableOpacity style={styles.inactiveTab}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <Path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <Path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* ── Grid ── */}
      {renderGrid()}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>{defaultUser.username}</Text>
          {defaultUser.verified && (
            // circle-dashed-check
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0095F6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={styles.verifiedIcon}>
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
              <Path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
              <Path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
              <Path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
              <Path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
              <Path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
              <Path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
              <Path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
              <Path d="M9 12l2 2l4 -4" />
            </Svg>
          )}
        </View>
        <View style={styles.headerRight}>
          {/* circle-dashed-plus */}
          <TouchableOpacity style={styles.headerIcon}>
            <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
              <Path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
              <Path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
              <Path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
              <Path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
              <Path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
              <Path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
              <Path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
              <Path d="M9 12h6" />
              <Path d="M12 9v6" />
            </Svg>
          </TouchableOpacity>
          {/* menu-2 */}
          <TouchableOpacity style={styles.headerIcon}>
            <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M4 6l16 0" />
              <Path d="M4 12l16 0" />
              <Path d="M4 18l16 0" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
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
  username: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  verifiedIcon: { marginLeft: 6 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginLeft: 16 },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  avatarContainer: { marginRight: 20 },
  avatarRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#E1306C',
    padding: 3,
  },
  avatar: { width: '100%', height: '100%', borderRadius: 45 },
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  statLabel: { color: '#AAAAAA', fontSize: 13, marginTop: 2 },
  bioSection: { paddingHorizontal: 16, paddingBottom: 16 },
  displayName: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  bioText: { color: '#FFFFFF', fontSize: 14, lineHeight: 18 },
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
  editButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  shareButton: {
    flex: 1,
    backgroundColor: '#262626',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  tabsSection: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#262626',
    marginBottom: GAP,
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#FFFFFF',
  },
  inactiveTab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  gridRow: { gap: GAP, marginBottom: GAP },
  gridImage: { backgroundColor: '#262626' },
});
