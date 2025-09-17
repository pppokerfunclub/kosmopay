# KosmoApp API Server

Простой Express.js сервер с TypeScript для обработки POST запросов.

## Возможности

- ✅ POST `/create` - создание платежей через GameMoney API
- ✅ GET `/health` - проверка состояния сервера
- ✅ GET `/` - базовый эндпоинт
- ✅ Интеграция с GameMoney платежной системой
- ✅ Telegram уведомления о платежах
- ✅ CORS поддержка
- ✅ Безопасность с Helmet
- ✅ TypeScript
- ✅ Docker контейнеризация

## Быстрый старт

### Локальная разработка

1. Установите зависимости:

```bash
pnpm install
```

2. Настройте переменные окружения:

```bash
cp env.example .env
# Отредактируйте .env файл и заполните реальные значения
```

3. Запустите в режиме разработки:

```bash
pnpm dev
```

4. Сервер будет доступен на `http://localhost:8080`

### Docker

1. Соберите образ:

```bash
docker build -t kosmoapp-api .
```

2. Запустите контейнер:

```bash
docker run -p 3001:3001 kosmoapp-api
```

### Docker Compose

```bash
docker-compose up --build
```

## API Endpoints

### POST /create

Принимает POST запрос и возвращает статус "okay".

**Запрос:**

```bash
curl -X POST http://localhost:3001/create \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

**Ответ:**

```json
{
  "status": "okay",
  "message": "Request processed successfully",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /health

Проверка состояния сервера.

**Ответ:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Переменные окружения

Скопируйте `env.example` в `.env` и заполните необходимые значения:

- `PORT` - порт сервера (по умолчанию: 3001)
- `NODE_ENV` - окружение (development/production)
- `BASE_URL` - базовый URL для success_url
- `GAMEMONEY_PROJECT_ID` - ID проекта в GameMoney
- `GAMEMONEY_HMAC_KEY` - ключ для подписи запросов
- `BOT_TOKEN` - токен Telegram бота
- `BOT_CHAT_ID` - ID чата для уведомлений

## Скрипты

- `pnpm dev` - запуск в режиме разработки
- `pnpm build` - сборка TypeScript
- `pnpm start` - запуск продакшн версии
