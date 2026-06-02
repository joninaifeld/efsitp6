// ...existing code...
# TP 6 EFSI

## Figmas utilizados de inspiración en los diseños:
- Base: https://www.figma.com/es-es/comunidad/file/1004033523744290376/instagram-modern-web-design
- Modal: https://www.figma.com/design/4PsQ9rHaN1GdQLb9SHlwAR/Instagram---Web-UI--Recreated---Community-?node-id=1-2&p=f&t=b3FS8SYMHSobVemk-0
- Profile: https://www.figma.com/design/kl8PK53wsHx1ylWZDstdjf/Instagram---Web-UI--Recreated---Community-?node-id=1-2&p=f&t=bPiphzzD1aa9B7QF-0

## Cómo organizamos el proyecto
- Estructura clara por carpetas: componentes, páginas, assets, datos inventados y hooks.
- Cada componente vive en su propia carpeta con su archivo .jsx/.tsx y su hoja de estilos si hace falta.
- Datos de ejemplo (mock) en una carpeta para no depender de un backend.

## Componentes que creamos
- Navbar
- Feed (lista de publicaciones)
- PostCard (tarjeta individual en el feed)
- PostDetailModal (vista individual de una publicación en modal)
- Profile (vista de perfil)
- ProfileHeader (datos y estadísticas del usuario)
- PostGrid (rejilla de publicaciones en el perfil)
- Comentarios/LikeButton (pequeños componentes de interacción)

## Responsabilidad de cada componente
- Navbar: navegación y accesos principales.
- Feed: monta la lista de PostCard y pasa handlers.
- PostCard: mostrar imagen, autor, resumen y emitir evento de selección.
- PostDetailModal: mostrar la publicación completa, comentarios y likes.
- Profile: mostrar datos del usuario y su PostGrid.
- ProfileHeader: solo muestra avatar, nombre, bio y contadores.
- PostGrid: organiza las PostCard en rejilla en la vista de perfil.

## Por qué componentizamos así
- Separación de responsabilidades: cada componente hace una sola cosa clara.
- Reusabilidad: PostCard se usa en feed y en grid.
- Mantenimiento: cambiar la UI de una pieza no afecta el resto.
- Pruebas más sencillas y menor complejidad por componente.

## Comunicación entre componentes con props
- El componente padre pasa datos y callbacks por props.
  - PostCard recibe post y onSelectPost(post) y solo llama al callback cuando el usuario hace click.
- El modal recibe el post seleccionado y callbacks para cerrar o modificar (onClose, onLike).

## Hooks usados y para qué
- useState: manejar estados locales como selectedPost, isModalOpen, lista de posts filtrados.
- useEffect: cargar datos iniciales desde los mocks o inicializar estado al montar.
- useCallback: memorizar callbacks pasados a muchos hijos para evitar re-render innecesario.
- useRef: manejo de focus o scroll dentro del modal.

## Visualización individual de publicaciones
- Al hacer click en una PostCard se guarda el post en selectedPost y se abre el PostDetailModal.
- El modal es controlado por isModalOpen (true/false) y recibe selectedPost para mostrar sus datos.
- El modal tiene su propio layout con imagen, descripción, comentarios y acciones.

## Simulación del perfil de usuario logueado
- Creamos un objeto mock user en /data o en un context simple.
- Ese objeto contiene id, username, name, avatar, bio, seguidores, siguiendo y posts (ids).
- Para este tp no hay autenticación real el user mock sirve como logueado.

## Datos mostrados en el perfil
- Avatar
- Nombre de usuario y nombre real
- Bio breve
- Contadores: cantidad de publicaciones, seguidores y seguidos
- Rejilla con las publicaciones (miniaturas)
- Posibilidad de ver cada publicación en modo individual (modal)

## Estados principales usados
- posts: array con las publicaciones (mock).
- selectedPost: post seleccionado para ver en detalle (null si no hay).
- isModalOpen: boolean para abrir/cerrar la vista individual.
- activeTab o viewMode (opcional): para cambiar entre grid/list en el perfil.
- loading / error (opcionales): para estados de carga o errores al obtener datos.