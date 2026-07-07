# TP 6 EFSI

Este repositorio tiene dos versiones del mismo proyecto: el clon de Instagram que hicimos primero en React para web, y después la versión mobile que migramos a React Native con Expo.

## Cómo está organizado el repo
- `web/` tiene el proyecto React original con Vite y TypeScript.
- `native/` tiene la versión mobile hecha con React Native y Expo.
- Cada carpeta tiene su propio `package.json`, sus dependencias y su README con la documentación del proyecto.

## Cómo ejecutar cada proyecto

### Web
```
cd web
npm i
npm run dev
```

### Mobile
```
cd native
npm i --legacy-peer-deps
npx expo start
```
Después escanear el QR con Expo Go, o presionar `a` para Android Emulator.

## Documentación
Cada proyecto tiene su README con el detalle de componentes, hooks, decisiones de diseño y referencias de Figma:
- web/README.md
- native/README.md
