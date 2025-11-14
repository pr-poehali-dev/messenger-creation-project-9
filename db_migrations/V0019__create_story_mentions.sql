CREATE TABLE IF NOT EXISTS t_p59162637_messenger_creation_p.story_mentions (
    id SERIAL PRIMARY KEY,
    story_id INTEGER NOT NULL REFERENCES t_p59162637_messenger_creation_p.stories(id),
    mentioned_user_id INTEGER NOT NULL REFERENCES t_p59162637_messenger_creation_p.users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(story_id, mentioned_user_id)
);

CREATE INDEX idx_story_mentions_user ON t_p59162637_messenger_creation_p.story_mentions(mentioned_user_id);
CREATE INDEX idx_story_mentions_story ON t_p59162637_messenger_creation_p.story_mentions(story_id);