-- Добавляем колонку gold_coins для золотых монет из драконьей игры
ALTER TABLE t_p59162637_messenger_creation_p.player_resources 
ADD COLUMN IF NOT EXISTS gold_coins INTEGER DEFAULT 0;

-- Комментарий для понимания назначения колонки
COMMENT ON COLUMN t_p59162637_messenger_creation_p.player_resources.gold_coins IS 'Золотые монеты для драконьей игры-кликера';