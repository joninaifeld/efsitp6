// ─── Tipos de dominio ───────────────────────────────────────────────────────

/** Representa un comentario en una publicación */
export interface Comment {
  text: string;
  username: string;
  userImage: string;
  likes: number;
}

/** Representa una publicación del feed */
export interface PostType {
  id: string;            // ID único para usar como key en FlatList
  username: string;
  userImage: string;
  location: string;      // Localización simulada del post
  postImage: string;
  caption: string;
  likes: number;
  comments: Comment[];
  year: string;
}

/** Representa una story de la barra superior */
export interface Story {
  username: string;
  userImage: string;
  isCloseFriend: boolean;
  isOwn?: boolean;       // true para la story del usuario logueado
}

/** Representa el usuario logueado */
export interface User {
  username: string;
  displayName: string;
  verified: boolean;
  userImage: string;
  likes: number;
  followers: number;
  following: number;
  bio: string;
  posts: PostType[];
  story: Story;
}

// ─── Tipos de parámetros de navegación ────────────────────────────────────────

/**
 * Define los parámetros que recibe cada ruta del Stack Navigator principal.
 * undefined significa que la ruta no recibe parámetros.
 */
export type RootStackParamList = {
  MainTabs: undefined;
  PostDetail: { post: PostType };
};

/**
 * Define las pestañas del Bottom Tab Navigator.
 */
export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Reels: undefined;
  Shop: undefined;
  Profile: undefined;
};
