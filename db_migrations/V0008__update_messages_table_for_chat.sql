-- Add user_id column as alias for sender_id
ALTER TABLE messages ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);

-- Copy data from sender_id to user_id for existing messages
UPDATE messages SET user_id = sender_id WHERE user_id IS NULL;

-- Add message column as alias for text
ALTER TABLE messages ADD COLUMN IF NOT EXISTS message TEXT;
UPDATE messages SET message = text WHERE message IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
