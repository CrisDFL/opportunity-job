# Usa una imagen base de Node.js
FROM node:20-alpine
# Establece la carpeta de trabajo dentro del contenedor
WORKDIR /app
# Copia primero las dependencias para ejecutarse mas rapido
COPY package*.json ./
# Instala las dependencias del proyecto
RUN npm install
# Copia todo lo demas
COPY . .
# Compila el proyecto TypeScript a JavaScript
RUN npm run build
# Puerto en el que se ejecutará la aplicación
EXPOSE 3000
# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
