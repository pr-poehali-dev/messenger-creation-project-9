CREATE TABLE friend_invitations (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  receiver_phone VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sender_id, receiver_phone)
);

CREATE INDEX idx_friend_invitations_receiver_phone ON friend_invitations(receiver_phone);
CREATE INDEX idx_friend_invitations_status ON friend_invitations(status);