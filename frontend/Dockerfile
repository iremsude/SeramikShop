# -------- 1. Build aşaması --------
FROM node:18-alpine AS build
WORKDIR /app

# Yalnızca paket dosyaları → cache faydalansın
COPY package*.json ./
RUN npm ci

# Tüm kaynak kodunu kopyala & üretim build’i al
COPY . .
RUN npm run build      # dist/ klasörünü oluşturur

# -------- 2. Runtime (NGINX) --------
FROM nginx:alpine
# Vite çıktısını Nginx’in kök dizinine kopyala
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
