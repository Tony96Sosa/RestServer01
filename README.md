# RestServer01

# CRUD - Node - Express - TypeScript

1. Instalar TypeScript y demás dependencias

```
npm i -D typescript @types/node ts-node-dev rimraf
```

2. Inicializar el archivo de configuración de TypeScript

```
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear scripts para dev, build y start

```
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

4. Verificar que este corriendo el docker damon
5. Levantar el contenedor con la imagen de la base de datos.

```
docker compose up -d
```

```
npx prisma init --datasource-provider postgres
```

```
nnpx prisma migrate dev --name init
```
