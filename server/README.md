# KosmoApp API Server

Простой Express.js сервер с TypeScript для обработки POST запросов.

## Возможности

- ✅ POST `/create` - создание платежей через Kanyon API
- ✅ GET `/health` - проверка состояния сервера
- ✅ GET `/` - базовый эндпоинт
- ✅ POST `/api/payments/callback` - обработка колбэков от Kanyon
- ✅ Интеграция с Kanyon платежной системой (СБП)
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

Создает платеж через Kanyon API и возвращает QR-код для оплаты через СБП.

**Запрос:**

```bash
curl -X POST http://localhost:3001/create \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "email": "user@example.com",
    "amount": 1000
  }'
```

**Параметры:**

- `userId` - ID пользователя (обязательно)
- `email` - email пользователя (обязательно)
- `amount` - сумма в рублях, минимум 1000 (обязательно)

**Ответ:**

```json
{
  "success": true,
  "url": "https://qr.nspk.ru/XXXXX",
  "orderId": "12345",
  "status": "okay"
}
```

### POST /api/payments/callback

Обрабатывает колбэки от Kanyon о статусе платежа. Отправляет уведомления в Telegram.

**Статусы:**

- `SUCCESS` / `COMPLETED` - успешная оплата
- `FAILED` - неудачная оплата
- `CREATED` / `PENDING` - ожидание оплаты
- `EXPIRED` - истек срок действия

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
- `BASE_URL` - базовый URL для callback URL
- `KANYON_LOGIN` - логин для Kanyon API
- `KANYON_PASSWORD` - пароль для Kanyon API
- `KANYON_TSP_ID` - ID торгово-сервисной точки в Kanyon
- `BOT_TOKEN` - токен Telegram бота
- `BOT_CHAT_ID` - ID чата для уведомлений

## Скрипты

- `pnpm dev` - запуск в режиме разработки
- `pnpm build` - сборка TypeScript
- `pnpm start` - запуск продакшн версии
