# 🌿 Weed Counter

Красивое приложение для отслеживания употребления марихуаны, построенное на Next.js с Neon PostgreSQL базой данных.

## 🚀 Возможности

- ✅ Добавление сессий с указанием количества и типа
- ✅ Статистика: общий вес, количество сессий, среднее за сессию
- ✅ Красивые анимации с Framer Motion
- ✅ Сохранение данных в Neon PostgreSQL
- ✅ Адаптивный дизайн
- ✅ Отладочная страница для просмотра данных

## 🛠️ Технологии

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Neon PostgreSQL
- **Deployment**: Vercel

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git clone <your-repo-url>
cd weedcliker
```

2. Установите зависимости:

```bash
npm install
```

3. Настройте базу данных Neon:

   - Создайте аккаунт на [neon.tech](https://neon.tech)
   - Создайте новый проект
   - Скопируйте строку подключения

4. Создайте файл `.env.local`:

```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

5. Инициализируйте базу данных:

```bash
# Выполните SQL из src/lib/schema.sql в вашей Neon базе данных
```

6. Запустите приложение:

```bash
npm run dev
```

## 🗄️ Структура базы данных

```sql
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  amount DECIMAL(5,2) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Добавьте переменную окружения `DATABASE_URL` в настройках проекта
3. Деплой произойдет автоматически

## 📱 Использование

- **Добавление сессии**: Нажмите "Добавить сессию" и заполните форму
- **Просмотр статистики**: Статистика отображается в верхней части
- **Удаление сессии**: Нажмите на корзину рядом с сессией
- **Отладка**: Перейдите на `/debug` для просмотра данных браузера

## 🔧 API Endpoints

- `GET /api/sessions?userId=default_user` - получить все сессии
- `POST /api/sessions` - создать новую сессию
- `DELETE /api/sessions/[id]?userId=default_user` - удалить сессию

## 🎨 Особенности дизайна

- Градиентный фон в зеленых тонах
- Полупрозрачные карточки с эффектом размытия
- Плавные анимации появления элементов
- Эмодзи для типов сессий
- Адаптивная сетка для мобильных устройств

## 📊 Типы сессий

- 🚬 Косяк (joint)
- 💨 Бонг (bong)
- 🫖 Трубка (pipe)
- 🍪 Еда (edible)

## 🔒 Безопасность

- Все запросы к базе данных защищены от SQL-инъекций
- Используется параметризованные запросы
- Проверка прав доступа по user_id

## 🚀 Производительность

- Server-side rendering с Next.js
- Оптимизированные изображения
- Ленивая загрузка компонентов
- Кэширование запросов к API

## 📝 Лицензия

MIT License
