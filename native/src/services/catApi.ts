import axios from 'axios';
import { PostType, Comment, Story } from '../types/types';
import { generateUniqueId } from '../utils/helpers';
import { mockLocations } from '../data/defaultUser';

// cliente para traer imágenes de gatos
const caasApi = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});

// cliente para traer comentarios simulados
const commsApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

// trae posts combinando imágenes de gatos con usuarios y comentarios de APIs externas
export async function fetchPosts(limit: number = 10): Promise<PostType[]> {
  try {
    // imágenes para los posts
    const responseForPosts = await caasApi.get(`/images/search?limit=${limit}`);
    const dataForPosts = responseForPosts.data || [];

    // imágenes para avatares, filtrando GIFs
    const responseForUsers = await caasApi.get(`/images/search?limit=${limit}`);
    const dataForUsers = (responseForUsers.data || []).filter(
      (item: any) => !item.url.endsWith('.gif')
    );

    // comentarios desde DummyJSON
    const responseForComments = await commsApi.get(`/comments?limit=${limit}`);
    const dataForComments = responseForComments?.data?.comments || [];

    // combina username de DummyJSON con imagen de gato
    const fetchedUsers = dataForUsers.map((item: any, index: number) => ({
      username: dataForComments[index]?.user?.username || `user_name_${index}`,
      userImage: item.url,
    }));

    // arma los comentarios con sus avatares
    const fetchedComments: Comment[] = dataForComments.map(
      (item: any, index: number) => ({
        text: item.body,
        username: item.user.username,
        likes: item.likes,
        userImage:
          fetchedUsers[index]?.userImage ||
          dataForUsers[Math.floor(Math.random() * dataForUsers.length)]?.url ||
          '',
      })
    );

    // arma cada post con imagen, usuario aleatorio y comentarios
    const fetchedPosts: PostType[] = dataForPosts.map((item: any) => {
      const randomUser =
        fetchedUsers[Math.floor(Math.random() * fetchedUsers.length)] || {
          username: 'user_name',
          userImage:
            dataForUsers[Math.floor(Math.random() * dataForUsers.length)]
              ?.url || '',
        };

      const randomLocation =
        mockLocations[Math.floor(Math.random() * mockLocations.length)];

      return {
        id: generateUniqueId(),
        username: randomUser.username,
        userImage: randomUser.userImage,
        location: randomLocation,
        postImage: item.url,
        caption:
          'miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu miaouu miaouumiaouu',
        likes: Math.floor(Math.random() * 1000),
        comments: fetchedComments,
        year: `${Math.floor(Math.random() * 5) + 2019}`,
      };
    });

    return fetchedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// trae las stories usando los mismos endpoints que los posts
export async function fetchStories(limit: number = 10): Promise<Story[]> {
  try {
    const responseForUsers = await caasApi.get(`/images/search?limit=${limit}`);
    const dataForUsers = (responseForUsers.data || []).filter(
      (item: any) => !item.url.endsWith('.gif')
    );

    const responseForComments = await commsApi.get(`/comments?limit=${limit}`);
    const dataForComments = responseForComments?.data?.comments || [];

    // 30% de chance de ser close friend
    const stories: Story[] = dataForUsers.map((item: any, index: number) => ({
      username:
        dataForComments[index]?.user?.username || `user_name_${index}`,
      userImage: item.url,
      isCloseFriend: Math.random() > 0.7,
      isOwn: false,
    }));

    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}
