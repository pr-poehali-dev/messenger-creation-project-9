CREATE TABLE IF NOT EXISTS t_p59162637_messenger_creation_p.message_reactions (
    id SERIAL PRIMARY KEY,
    message_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    reaction VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(message_id, user_id, reaction)
);

CREATE INDEX idx_message_reactions_message ON t_p59162637_messenger_creation_p.message_reactions(message_id);