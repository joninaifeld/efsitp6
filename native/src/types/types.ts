// tipos de dominio

export interface Comment {
  text: string;
  username: string;
  userImage: string;
  likes: number;
}

export interface PostType {
  id: string;
  username: string;
  userImage: string;
  location: string;
  postImage: string;
  caption: string;
  likes: number;
  comments: Comment[];
  year: string;
}

export interface Story {
  username: string;
  userImage: string;
  isCloseFriend: boolean;
  isOwn?: boolean; // true si es la story del usuario logueado
}

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

// tipos de navegación

// parámetros de cada ruta del stack principal
export type RootStackParamList = {
  MainTabs: undefined;
  PostDetail: { post: PostType };
};

// pestañas del tab navigator
export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Reels: undefined;
  Shop: undefined;
  Profile: undefined;
};
