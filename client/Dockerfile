# Многоэтапная сборка для React приложения с nginx

# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем pnpm
RUN npm install -g pnpm

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение для продакшена
RUN pnpm build

# Этап 2: Nginx для статических файлов
FROM nginx:alpine

# Копируем собранное приложение из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001

# Меняем владельца файлов
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Создаем директории для nginx
RUN mkdir -p /var/run/nginx && \
    chown -R nginx:nginx /var/run/nginx

# Переключаемся на пользователя nginx
USER nginx

# Открываем порт 3000
EXPOSE 3000

# Проверка здоровья
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
