import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList, PostType, Story } from '../types/types';
import { fetchPosts, fetchStories } from '../services/catApi';
import { defaultUser } from '../data/defaultUser';
import PostCard from '../components/PostCard';
import StoriesBar from '../components/StoriesBar';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedPosts, fetchedStories] = await Promise.all([
        fetchPosts(10),
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

  const handlePostPress = (post: PostType) => {
    navigation.navigate('PostDetail', { post });
  };

  const renderListHeader = () => (
    <StoriesBar stories={stories} ownStory={defaultUser.story} />
  );

  const renderPost = ({ item }: { item: PostType }) => (
    <PostCard data={item} onPress={handlePostPress} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Instagram</Text>
        <View style={styles.headerIcons}>
          {/* square-plus */}
          <TouchableOpacity style={styles.iconButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M9 12h6" />
              <Path d="M12 9v6" />
              <Path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
            </Svg>
          </TouchableOpacity>

          {/* heart outline */}
          <TouchableOpacity style={styles.iconButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </Svg>
          </TouchableOpacity>

          {/* brand-messenger */}
          <TouchableOpacity style={styles.iconButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
              <Path d="M8 13l3 -2l2 2l3 -2" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Feed ── */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={10}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
