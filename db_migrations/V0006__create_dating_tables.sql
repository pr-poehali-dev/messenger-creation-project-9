-- Таблица анкет для знакомств
CREATE TABLE IF NOT EXISTS dating_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(20),
    bio TEXT,
    interests TEXT[],
    location VARCHAR(100),
    photos TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица матчей (взаимных лайков)
CREATE TABLE IF NOT EXISTS dating_matches (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER NOT NULL REFERENCES users(id),
    user2_id INTEGER NOT NULL REFERENCES users(id),
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user1_id, user2_id),
    CHECK (user1_id < user2_id)
);

-- Таблица лайков/дислайков
CREATE TABLE IF NOT EXISTS dating_swipes (
    id SERIAL PRIMARY KEY,
    from_user_id INTEGER NOT NULL REFERENCES users(id),
    to_user_id INTEGER NOT NULL REFERENCES users(id),
    action VARCHAR(10) NOT NULL CHECK (action IN ('like', 'dislike', 'superlike')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(from_user_id, to_user_id)
);

-- Индексы для быстрого поиска
CREATE INDEX idx_dating_profiles_user_id ON dating_profiles(user_id);
CREATE INDEX idx_dating_profiles_active ON dating_profiles(is_active);
CREATE INDEX idx_dating_swipes_from_user ON dating_swipes(from_user_id);
CREATE INDEX idx_dating_swipes_to_user ON dating_swipes(to_user_id);
CREATE INDEX idx_dating_matches_users ON dating_matches(user1_id, user2_id);