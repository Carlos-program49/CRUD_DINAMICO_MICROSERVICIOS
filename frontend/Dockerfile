# Etapa 1: build con Node 20
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos deps y hacemos npm ci
COPY package*.json ./
RUN npm ci

# Copiamos el resto y compilamos Angular
COPY . .
RUN npm run build -- --output-path=dist

# Etapa 2: runtime con nginx
FROM nginx:stable-alpine
# Limpiamos html por defecto
RUN rm -rf /usr/share/nginx/html/*
# Copiamos la carpeta dist desde el build anterior
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
