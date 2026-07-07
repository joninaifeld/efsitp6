# TP 6 EFSI — Mobile

## Instrucciones básicas de ejecución:
- Realizar los siguientes comandos para ejecutar el proyecto:
    - npm i --legacy-peer-deps
    - npx expo start
- Escanear el QR con la app Expo Go en el celular, o presionar `a` para el emulador de Android.

## Figmas utilizados de inspiración en los diseños:
- Feed y general: https://www.figma.com/community/file/1004033523744290376/instagram-modern-web-design
- Perfil: capturas de referencia del mockup de Instagram dark mode adjuntadas en la entrega

## Cómo organizamos el proyecto
- Separamos la app en capas bien definidas: navegación, pantallas, componentes, servicios, datos y tipos.
- Cada pantalla vive en su propio archivo dentro de `src/screens/` y se encarga de su propio layout.
- Los componentes reutilizables como la tarjeta de post y la barra de stories están en `src/components/`.
- La lógica de acceso a las APIs quedó aislada en `src/services/catApi.ts` para no mezclarla con la UI.
- Los tipos de TypeScript están centralizados en `src/types/types.ts` y se importan desde cualquier parte.

## Componentes que creamos
- StoriesBar (barra horizontal de stories al tope del feed)
- PostCard (tarjeta individual de publicación en el feed)
- HomeScreen (pantalla principal con el feed)
- PostDetailScreen (vista extendida de una publicación, se presenta como modal)
- ProfileScreen (perfil del usuario con grid de publicaciones)

## Responsabilidad de cada componente
- StoriesBar: muestra la fila de avatares con borde de story, la primera siempre es la del usuario propio con el botón +.
- PostCard: muestra avatar, username, localización, imagen, barra de acciones (like/comentar/compartir/guardar), contador de likes y caption. Maneja su propio estado de like y guardado.
- HomeScreen: orquesta el fetch de posts y stories al montar, renderiza el feed usando FlatList con StoriesBar como header.
- PostDetailScreen: recibe el post completo por parámetros de navegación, muestra la imagen, comentarios, y permite likear con feedback visual en tiempo real.
- ProfileScreen: muestra la info del usuario logueado y usa FlatList con numColumns=3 para armar el grid de publicaciones.

## Por qué componentizamos así
- Cada componente hace una sola cosa y la hace bien.
- PostCard se puede reutilizar en distintos contextos sin cambiar nada.
- Aislar la lógica de fetching en el servicio hace que sea fácil de cambiar la API sin tocar la UI.
- Las pantallas son las únicas que conocen la navegación; los componentes solo emiten eventos hacia arriba.

## Comunicación entre componentes con props
- HomeScreen le pasa a PostCard el objeto `post` y un callback `onPress(post)` para navegar al detalle.
- StoriesBar recibe el array de stories del feed y la story propia del usuario por separado.
- PostDetailScreen recibe el post completo a través de los parámetros de React Navigation (`route.params.post`).
- Ningún componente hijo conoce la navegación directamente, todo sube por callbacks.

## Hooks usados y para qué
- useState: manejar `posts`, `stories` y `loading` en HomeScreen, y los estados de `liked`, `likesCount` y `saved` en PostCard y PostDetailScreen.
- useEffect: disparar el fetch de datos al montar HomeScreen (una sola vez con array vacío).
- useNavigation y useRoute: hooks de React Navigation para navegar y leer parámetros sin prop drilling.

## Navegación
- Usamos React Navigation con una estructura de dos capas.
- RootNavigator es un Stack Navigator que tiene dos rutas: las pestañas principales y la pantalla de detalle del post como modal.
- MainTabs es un Bottom Tab Navigator con cinco pestañas: Home, Search, Reels, Shop y Profile.
- Al presionar un post en el feed o en el grid del perfil, se navega a PostDetailScreen pasando el objeto completo del post como parámetro.

## Consumo de APIs
- Usamos dos clientes de Axios, igual que en la versión web.
- `caasApi` apunta a `https://api.thecatapi.com/v1` y trae las imágenes de gatos para los posts y avatares.
- `commsApi` apunta a `https://dummyjson.com` y trae los comentarios y usernames simulados.
- El flujo es: pedimos imágenes para los posts, imágenes para los avatares (filtrando GIFs) y comentarios, después combinamos todo en un array de posts.

## Estados principales usados
- posts: array con las publicaciones traídas de la API (se guarda en HomeScreen).
- stories: array de stories para la barra horizontal (se guarda en HomeScreen).
- loading: booleano para mostrar el spinner mientras se carga el feed.
- liked / likesCount: par de estados en PostCard y PostDetailScreen para el like interactivo.
- saved: booleano para el estado del botón de guardar en cada post.
