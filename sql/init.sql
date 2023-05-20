-- Запросы для инициализации базы

CREATE TABLE IF NOT EXISTS users (
  ID UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  name text,
  email text
);