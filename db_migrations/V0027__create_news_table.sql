-- Создание таблицы для новостей
CREATE TABLE IF NOT EXISTS t_p59162637_messenger_creation_p.news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author VARCHAR(100),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT true
);

-- Создание индекса для быстрого поиска по slug
CREATE INDEX IF NOT EXISTS idx_news_slug ON t_p59162637_messenger_creation_p.news(slug);

-- Создание индекса для сортировки по дате публикации
CREATE INDEX IF NOT EXISTS idx_news_published_at ON t_p59162637_messenger_creation_p.news(published_at DESC);