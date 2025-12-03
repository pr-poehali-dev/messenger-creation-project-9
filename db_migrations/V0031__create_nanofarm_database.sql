CREATE TABLE nano_players (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    session_token VARCHAR(255),
    coins INTEGER DEFAULT 1000,
    crystals INTEGER DEFAULT 10,
    energy INTEGER DEFAULT 100,
    max_energy INTEGER DEFAULT 100,
    experience INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    last_energy_update TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE nano_plant_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    emoji VARCHAR(10) NOT NULL,
    plant_type VARCHAR(20) NOT NULL,
    grow_time INTEGER NOT NULL,
    yield_coins INTEGER DEFAULT 0,
    yield_energy INTEGER DEFAULT 0,
    energy_cost INTEGER DEFAULT 10,
    price_coins INTEGER DEFAULT 0,
    price_crystals INTEGER DEFAULT 0,
    required_level INTEGER DEFAULT 1,
    parent1_id INTEGER,
    parent2_id INTEGER,
    description TEXT
);

CREATE TABLE nano_player_beds (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    bed_number INTEGER NOT NULL,
    plant_type_id INTEGER,
    planted_at TIMESTAMP,
    ready_at TIMESTAMP,
    is_ready BOOLEAN DEFAULT FALSE,
    is_withered BOOLEAN DEFAULT FALSE,
    UNIQUE(player_id, bed_number)
);

CREATE TABLE nano_lab_experiments (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    parent1_id INTEGER,
    parent2_id INTEGER,
    result_plant_id INTEGER,
    started_at TIMESTAMP DEFAULT NOW(),
    ready_at TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    is_claimed BOOLEAN DEFAULT FALSE
);

CREATE TABLE nano_player_discovered_plants (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    plant_type_id INTEGER NOT NULL,
    discovered_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(player_id, plant_type_id)
);

CREATE TABLE nano_player_inventory (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    plant_type_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 0,
    UNIQUE(player_id, plant_type_id)
);

CREATE TABLE nano_quests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    quest_type VARCHAR(50) NOT NULL,
    target_value INTEGER NOT NULL,
    reward_coins INTEGER DEFAULT 0,
    reward_crystals INTEGER DEFAULT 0,
    reward_energy INTEGER DEFAULT 0,
    required_level INTEGER DEFAULT 1
);

CREATE TABLE nano_player_quests (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    quest_id INTEGER NOT NULL,
    progress INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    is_claimed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO nano_plant_types (name, emoji, plant_type, grow_time, yield_coins, yield_energy, energy_cost, price_coins, required_level, description) VALUES
('Пшеница', '🌾', 'basic', 30, 20, 5, 5, 10, 1, 'Базовое растение'),
('Морковь', '🥕', 'basic', 60, 40, 10, 10, 30, 1, 'Оранжевый корнеплод'),
('Томат', '🍅', 'basic', 90, 60, 15, 15, 60, 2, 'Сочный помидор'),
('Кукуруза', '🌽', 'basic', 120, 80, 20, 20, 100, 3, 'Желтое растение'),
('Баклажан', '🍆', 'basic', 150, 100, 25, 25, 150, 4, 'Фиолетовый овощ'),
('Тыква', '🎃', 'basic', 180, 120, 30, 30, 200, 5, 'Большая тыква'),
('Арбуз', '🍉', 'basic', 240, 150, 40, 35, 300, 6, 'Сладкая ягода'),
('Подсолнух', '🌻', 'basic', 200, 130, 35, 30, 250, 5, 'Желтый цветок');

INSERT INTO nano_quests (title, description, quest_type, target_value, reward_coins, reward_crystals, reward_energy, required_level) VALUES
('Первый урожай', 'Соберите 5 растений', 'harvest', 5, 100, 1, 20, 1),
('Ученый-садовод', 'Откройте 3 растения', 'discover', 3, 200, 2, 30, 1),
('Опытный фермер', 'Соберите 20 растений', 'harvest', 20, 300, 3, 50, 2),
('Мастер гибридизации', 'Проведите 5 экспериментов', 'experiment', 5, 500, 5, 100, 3),
('Путь к бессмертию', 'Достигните 10 уровня', 'level', 10, 1000, 10, 200, 1);
