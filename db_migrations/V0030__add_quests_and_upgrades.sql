-- Таблица квестов (шаблоны заданий)
CREATE TABLE IF NOT EXISTS quests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    quest_type VARCHAR(50) NOT NULL,
    target_value INTEGER NOT NULL,
    reward_coins INTEGER DEFAULT 0,
    reward_wood INTEGER DEFAULT 0,
    reward_stone INTEGER DEFAULT 0,
    reward_food INTEGER DEFAULT 0,
    reward_iron INTEGER DEFAULT 0,
    reward_experience INTEGER DEFAULT 0,
    required_level INTEGER DEFAULT 1,
    icon TEXT
);

-- Активные квесты игрока
CREATE TABLE IF NOT EXISTS player_quests (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    quest_id INTEGER REFERENCES quests(id),
    current_progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(player_id, quest_id)
);

-- Индексы для квестов
CREATE INDEX IF NOT EXISTS idx_player_quests_player ON player_quests(player_id);
CREATE INDEX IF NOT EXISTS idx_player_quests_completed ON player_quests(completed);

-- Обновление таблицы building_types для поддержки уровней
ALTER TABLE building_types ADD COLUMN IF NOT EXISTS max_level INTEGER DEFAULT 5;
ALTER TABLE building_types ADD COLUMN IF NOT EXISTS upgrade_cost_multiplier DECIMAL(3,2) DEFAULT 1.5;

-- Вставка базовых квестов
INSERT INTO quests (title, description, quest_type, target_value, reward_coins, reward_experience, required_level, icon) VALUES
('Первые шаги', 'Постройте своё первое здание', 'build_buildings', 1, 100, 50, 1, '🏗️'),
('Строитель', 'Постройте 5 зданий', 'build_buildings', 5, 500, 200, 1, '🏛️'),
('Лесоруб', 'Соберите 100 древесины', 'collect_wood', 100, 200, 100, 1, '🪵'),
('Каменотёс', 'Соберите 100 камня', 'collect_stone', 100, 200, 100, 1, '🪨'),
('Фермер', 'Соберите 100 еды', 'collect_food', 100, 200, 100, 1, '🌾'),
('Экономист', 'Накопите 1000 монет', 'accumulate_coins', 1000, 500, 150, 2, '💰'),
('Мастер улучшений', 'Улучшите любое здание до 2 уровня', 'upgrade_building', 1, 300, 150, 2, '⬆️'),
('Металлург', 'Соберите 50 железа', 'collect_iron', 50, 400, 200, 3, '⚙️'),
('Градостроитель', 'Постройте 10 городских зданий', 'build_city', 10, 1000, 500, 3, '🏙️'),
('Агроном', 'Постройте 10 ферм', 'build_farm', 10, 1000, 500, 3, '🚜');

-- Обновление max_level для зданий
UPDATE building_types SET max_level = 5, upgrade_cost_multiplier = 1.5;