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
        { text: '¡Qué carita más bonita!', username: 'ana', userImage: 'https://cdn2.thecatapi.com/images/1.jpg', likes: 4 },
        { text: 'Me encantó la foto', username: 'juan', userImage: 'https://cdn2.thecatapi.com/images/3.jpg', likes: 2 },
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
        { text: 'Sueña con peces :)', username: 'luis', userImage: 'https://cdn2.thecatapi.com/images/4.jpg', likes: 1 },
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
    {
      id: 'own-4',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Recoleta, CABA',
      postImage: 'https://cdn2.thecatapi.com/images/bpc.jpg',
      caption: 'Explorando nuevos rincones 🗺️',
      likes: 87,
      comments: [
        { text: 'Qué lugar tan chulo', username: 'mar', userImage: 'https://cdn2.thecatapi.com/images/5.jpg', likes: 0 },
      ],
      year: '2022',
    },
    {
      id: 'own-5',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'San Telmo, CABA',
      postImage: 'https://cdn2.thecatapi.com/images/e7b.jpg',
      caption: 'Retrato improvisado 🎨',
      likes: 129,
      comments: [],
      year: '2021',
    },
    {
      id: 'own-6',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Villa Crespo',
      postImage: 'https://cdn2.thecatapi.com/images/dkp.jpg',
      caption: 'Recuerdos de verano ☀️',
      likes: 444,
      comments: [
        { text: 'Hermoso...', username: 'sara', userImage: 'https://cdn2.thecatapi.com/images/6.jpg', likes: 3 },
      ],
      year: '2021',
    },
    {
      id: 'own-7',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Caballito, CABA',
      postImage: 'https://cdn2.thecatapi.com/images/6os.jpg',
      caption: 'Pequeños detalles que alegran el día 🌿',
      likes: 98,
      comments: [],
      year: '2020',
    },
    {
      id: 'own-8',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Núñez, Buenos Aires',
      postImage: 'https://cdn2.thecatapi.com/images/40g.jpg',
      caption: 'Un domingo tranquilo 🌤️',
      likes: 275,
      comments: [
        { text: 'Me encanta!', username: 'pedro', userImage: 'https://cdn2.thecatapi.com/images/7.jpg', likes: 2 },
      ],
      year: '2020',
    },
    {
      id: 'own-9',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Palermo, CABA',
      postImage: 'https://cdn2.thecatapi.com/images/9q5.jpg',
      caption: 'Tarde de café ☕',
      likes: 190,
      comments: [],
      year: '2019',
    },
    {
      id: 'own-10',
      username: 'dami.dami.dami',
      userImage: 'https://cdn2.thecatapi.com/images/2iu.jpg',
      location: 'Buenos Aires, Argentina',
      postImage: 'https://cdn2.thecatapi.com/images/as7.jpg',
      caption: 'El mejor compañero 🐾',
      likes: 560,
      comments: [
        { text: 'Adorable!!', username: 'vale', userImage: 'https://cdn2.thecatapi.com/images/8.jpg', likes: 5 },
      ],
      year: '2019',
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
