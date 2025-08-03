import { neon } from '@neondatabase/serverless';

// Получаем строку подключения из переменных окружения
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('DATABASE_URL не установлен. Используется режим разработки без базы данных.');
}

// Создаем mock sql для разработки
const mockSql = async (_strings: TemplateStringsArray, ..._values: unknown[]) => {
  console.warn('База данных недоступна. Используется mock режим.');
  return [];
};

const sql = databaseUrl ? neon(databaseUrl) : mockSql;

export { sql }; 