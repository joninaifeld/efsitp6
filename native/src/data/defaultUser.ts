import { User } from '../types/types';

/**
 * Usuario por defecto del sistema.
 * Contiene los datos del perfil y las publicaciones del usuario logueado.
 */
export const defaultUser: User = {
  username: 'dami.dami.dami',
  displayName: 'dami',
  verified: true,
  followers: 100,
  following: 42,
  likes: 1000,
  userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
  bio: 'Amante de los gatos y la fotografía 📸🐱',
  posts: [
    {
      id: 'own-1',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Buenos Aires, Argentina',
      postImage: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
      caption: 'Paseo matutino con mi amigo peludo 🌅',
      likes: 342,
      comments: [
        {
          text: '¡Qué carita más bonita!',
          username: 'ana',
          userImage: 'https://cdn2.thecatapi.com/images/1.jpg',
          likes: 4,
        },
        {
          text: 'Me encantó la foto',
          username: 'juan',
          userImage: 'https://cdn2.thecatapi.com/images/3.jpg',
          likes: 2,
        },
      ],
      year: '2024',
    },
    {
      id: 'own-2',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Capital Federal',
      postImage: 'https://cdn2.thecatapi.com/images/7f0.jpg',
      caption: 'Siesta de domingo 😴',
      likes: 210,
      comments: [
        {
          text: 'Sueña con peces :)',
          username: 'luis',
          userImage: 'https://cdn2.thecatapi.com/images/4.jpg',
          likes: 1,
        },
      ],
      year: '2023',
    },
    {
      id: 'own-3',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Palermo, CABA',
      postImage: 'https://cdn2.thecatapi.com/images/8bn.jpg',
      caption: 'Atrapé la luz perfecta ✨',
      likes: 512,
      comments: [],
      year: '2022',
    },
  ],
  story: {
    username: 'dami.dami.dami',
    userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
    isCloseFriend: false,
    isOwn: true,
  },
};

/**
 * Lista de localizaciones simuladas para los posts
 */
export const mockLocations = [
  'Buenos Aires, Argentina',
  'Palermo, CABA',
  'Recoleta, CABA',
  'San Telmo, CABA',
  'Capital Federal',
  'Villa Crespo',
  'Caballito, CABA',
  'Núñez, Buenos Aires',
];
