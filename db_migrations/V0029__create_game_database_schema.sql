-- Таблица пользователей (игроков)
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0
);

-- Таблица игровых ресурсов игрока
CREATE TABLE IF NOT EXISTS player_resources (
    player_id INTEGER PRIMARY KEY REFERENCES players(id),
    coins INTEGER DEFAULT 1000,
    wood INTEGER DEFAULT 100,
    stone INTEGER DEFAULT 100,
    food INTEGER DEFAULT 50,
    iron INTEGER DEFAULT 0,
    gold INTEGER DEFAULT 0,
    population INTEGER DEFAULT 5,
    max_population INTEGER DEFAULT 10,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Типы зданий (справочник)
CREATE TABLE IF NOT EXISTS building_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(20) NOT NULL,
    description TEXT,
    cost_coins INTEGER DEFAULT 0,
    cost_wood INTEGER DEFAULT 0,
    cost_stone INTEGER DEFAULT 0,
    cost_iron INTEGER DEFAULT 0,
    build_time INTEGER DEFAULT 60,
    produces_resource VARCHAR(20),
    production_rate INTEGER DEFAULT 0,
    production_interval INTEGER DEFAULT 3600,
    provides_population INTEGER DEFAULT 0,
    image_url TEXT
);

-- Здания игрока
CREATE TABLE IF NOT EXISTS player_buildings (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    building_type_id INTEGER REFERENCES building_types(id),
    position_x INTEGER NOT NULL,
    position_y INTEGER NOT NULL,
    level INTEGER DEFAULT 1,
    built_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_collected TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_building BOOLEAN DEFAULT FALSE,
    build_complete_at TIMESTAMP,
    UNIQUE(player_id, position_x, position_y)
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_player_buildings_player ON player_buildings(player_id);
CREATE INDEX IF NOT EXISTS idx_player_buildings_type ON player_buildings(building_type_id);

-- Вставка базовых типов зданий
INSERT INTO building_types (name, category, description, cost_coins, cost_wood, cost_stone, build_time, produces_resource, production_rate, production_interval, image_url) VALUES
('Дом', 'city', 'Увеличивает лимит населения', 100, 50, 30, 30, NULL, 0, 0, '🏠'),
('Лесопилка', 'city', 'Производит древесину', 150, 30, 50, 60, 'wood', 10, 300, '🪵'),
('Каменоломня', 'city', 'Добывает камень', 200, 40, 20, 90, 'stone', 8, 360, '⛏️'),
('Ферма', 'farm', 'Выращивает еду', 120, 60, 20, 45, 'food', 15, 240, '🌾'),
('Шахта', 'city', 'Добывает железо', 500, 100, 200, 180, 'iron', 5, 600, '⚒️'),
('Рынок', 'city', 'Приносит монеты', 300, 80, 80, 120, 'coins', 50, 300, '🏪'),
('Пшеничное поле', 'farm', 'Выращивает пшеницу', 80, 40, 10, 30, 'food', 12, 200, '🌻'),
('Сад', 'farm', 'Выращивает фрукты', 150, 70, 30, 60, 'food', 20, 400, '🍎'),
('Ратуша', 'city', 'Центр города', 1000, 200, 200, 300, 'coins', 100, 600, '🏛️'),
('Склад', 'city', 'Хранит ресурсы', 250, 100, 100, 90, NULL, 0, 0, '📦');