# 🚀 Деплой Weed Counter на Vercel

## 📋 Предварительные требования

1. **GitHub аккаунт** - для хранения кода
2. **Vercel аккаунт** - для деплоя
3. **Neon аккаунт** - для базы данных

## 🗄️ Настройка Neon базы данных

### 1. Создание базы данных

1. Перейдите на [neon.tech](https://neon.tech)
2. Создайте аккаунт и новый проект
3. Выберите регион (рекомендуется ближайший к вам)
4. Скопируйте строку подключения

### 2. Инициализация схемы

1. Откройте SQL Editor в Neon Dashboard
2. Выполните SQL из файла `src/lib/schema.sql`:

```sql
-- Создание таблицы для сессий
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  amount DECIMAL(5,2) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрого поиска по пользователю
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- Создание индекса для сортировки по дате
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);
```

## 🌐 Деплой на Vercel

### 1. Подготовка репозитория

1. Создайте репозиторий на GitHub
2. Загрузите код в репозиторий:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/weedcliker.git
git push -u origin main
```

### 2. Подключение к Vercel

1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите ваш репозиторий `weedcliker`
5. Нажмите "Import"

### 3. Настройка переменных окружения

1. В настройках проекта перейдите в "Environment Variables"
2. Добавьте переменную:
   - **Name**: `DATABASE_URL`
   - **Value**: Ваша строка подключения из Neon
   - **Environment**: Production, Preview, Development

### 4. Деплой

1. Vercel автоматически определит, что это Next.js проект
2. Нажмите "Deploy"
3. Дождитесь завершения деплоя

## 🔧 Проверка деплоя

### 1. Тестирование API

После деплоя проверьте API endpoints:

```bash
# Получить сессии
curl https://your-app.vercel.app/api/sessions?userId=default_user

# Создать сессию
curl -X POST https://your-app.vercel.app/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "default_user",
    "date": "01.01.2024",
    "time": "12:00:00",
    "amount": 0.5,
    "type": "joint"
  }'
```

### 2. Проверка базы данных

1. Откройте Neon Dashboard
2. Перейдите в SQL Editor
3. Выполните запрос:

```sql
SELECT * FROM sessions ORDER BY created_at DESC LIMIT 10;
```

## 🛠️ Устранение неполадок

### Проблема: "DATABASE_URL не установлен"

**Решение**: Проверьте, что переменная окружения `DATABASE_URL` добавлена в Vercel

### Проблема: "Connection failed"

**Решение**:

1. Проверьте строку подключения в Neon
2. Убедитесь, что база данных активна
3. Проверьте настройки безопасности в Neon

### Проблема: "Table does not exist"

**Решение**: Выполните SQL схему в Neon SQL Editor

## 📊 Мониторинг

### Vercel Analytics

- Перейдите в "Analytics" в Vercel Dashboard
- Отслеживайте производительность и ошибки

### Neon Monitoring

- В Neon Dashboard перейдите в "Usage"
- Отслеживайте использование базы данных

## 🔒 Безопасность

### Переменные окружения

- Никогда не коммитьте `DATABASE_URL` в код
- Используйте только Vercel Environment Variables

### База данных

- Регулярно делайте бэкапы в Neon
- Используйте разные базы для dev/staging/prod

## 🚀 Дальнейшие улучшения

1. **Аутентификация**: Добавьте NextAuth.js
2. **Реальное время**: Используйте Neon Serverless Driver
3. **Кэширование**: Добавьте Redis
4. **Аналитика**: Подключите Google Analytics
5. **Уведомления**: Добавьте email уведомления

## 📞 Поддержка

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Neon**: [neon.tech/docs](https://neon.tech/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
