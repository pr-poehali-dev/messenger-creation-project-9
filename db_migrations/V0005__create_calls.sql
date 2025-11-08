CREATE TABLE IF NOT EXISTS t_p59162637_messenger_creation_p.calls (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL,
    caller_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    call_type VARCHAR(10) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    duration INTEGER
);

CREATE INDEX idx_calls_chat ON t_p59162637_messenger_creation_p.calls(chat_id);
CREATE INDEX idx_calls_status ON t_p59162637_messenger_creation_p.calls(status);