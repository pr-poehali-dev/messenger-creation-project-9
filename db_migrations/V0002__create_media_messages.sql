CREATE TABLE IF NOT EXISTS t_p59162637_messenger_creation_p.media_messages (
    id SERIAL PRIMARY KEY,
    message_id INTEGER NOT NULL UNIQUE,
    message_type VARCHAR(20) NOT NULL,
    media_url TEXT,
    media_duration INTEGER,
    media_thumbnail TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);