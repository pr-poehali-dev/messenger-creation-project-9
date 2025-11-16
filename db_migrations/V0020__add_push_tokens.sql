-- Add push notification tokens to users table
ALTER TABLE t_p59162637_messenger_creation_p.users 
ADD COLUMN IF NOT EXISTS push_token TEXT,
ADD COLUMN IF NOT EXISTS push_enabled BOOLEAN DEFAULT true;