CREATE TABLE IF NOT EXISTS t_p59162637_messenger_creation_p.removed_messages (
    id SERIAL PRIMARY KEY,
    message_id INTEGER NOT NULL UNIQUE,
    removed_by INTEGER NOT NULL,
    removed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_removed_messages_message ON t_p59162637_messenger_creation_p.removed_messages(message_id);