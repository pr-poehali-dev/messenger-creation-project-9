-- Add missing columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS salt VARCHAR(64);
ALTER TABLE users ADD COLUMN IF NOT EXISTS session_token VARCHAR(256);
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;

-- Rename avatar to keep old data but prefer avatar_url
UPDATE users SET avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || username WHERE avatar_url IS NULL;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_users_session_token ON users(session_token);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
