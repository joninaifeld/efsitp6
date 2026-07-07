import axios from 'axios';
import { PostType, Comment, Story } from '../types/types';
import { generateUniqueId } from '../utils/helpers';
import { mockLocations } from '../data/defaultUser';

/**
 * Cliente de Axios para TheCatAPI — igual al caasApi del proyecto web.
 * Trae imágenes de gatos para posts y avatares.
 */
const caasApi = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});

/**
 * Cliente de Axios para DummyJSON — igual al commsApi del proyecto web.
 * Trae comentarios simulados.
 */
const commsApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

/**
 * Obtiene los datos del feed: posts, usuarios y comentarios.
 * Replica exactamente el mismo flujo de fetchData() del App.tsx web:
 *
 * 1. GET /images/search?limit=10  → imágenes para los posts
 * 2. GET /images/search?limit=10  → imágenes para avatares de usuarios (filtrando .gif)
 * 3. GET /comments?limit=10       → comentarios de DummyJSON
 * 4. Mapea todo en PostType[]
 *
 * @returns Promise<PostType[]> — array de al menos 10 posts
 */
export async function fetchPosts(limit: number = 10): Promise<PostType[]> {
  try {
    // 1. Imágenes para los posts
    const responseForPosts = await caasApi.get(`/images/search?limit=${limit}`);
    const dataForPosts = responseForPosts.data || [];

    // 2. Imágenes para avatares — filtrar GIFs igual que en el web
    const responseForUsers = await caasApi.get(`/images/search?limit=${limit}`);
    const dataForUsers = (responseForUsers.data || []).filter(
      (item: any) => !item.url.endsWith('.gif')
    );

    // 3. Comentarios desde DummyJSON
    const responseForComments = await commsApi.get(`/comments?limit=${limit}`);
    const dataForComments = responseForComments?.data?.comments || [];

    // Mapear usuarios: username desde DummyJSON + imagen de gato
    const fetchedUsers = dataForUsers.map((item: any, index: number) => ({
      username: dataForComments[index]?.user?.username || `user_name_${index}`,
      userImage: item.url,
    }));

    // Mapear comentarios con sus avatares
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

    // Construir cada post combinando imagen + usuario aleatorio + comentarios
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

/**
 * Obtiene las stories del feed.
 * Reutiliza las mismas imágenes de usuarios que se usan en los posts.
 *
 * @returns Promise<Story[]>
 */
export async function fetchStories(limit: number = 10): Promise<Story[]> {
  try {
    // Mismos endpoints que el web para consistencia
    const responseForUsers = await caasApi.get(`/images/search?limit=${limit}`);
    const dataForUsers = (responseForUsers.data || []).filter(
      (item: any) => !item.url.endsWith('.gif')
    );

    const responseForComments = await commsApi.get(`/comments?limit=${limit}`);
    const dataForComments = responseForComments?.data?.comments || [];

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
