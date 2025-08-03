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