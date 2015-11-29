
CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  user_name VARCHAR(30) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ default CURRENT_TIMESTAMP NOT NULL,
  sent_from INT REFERENCES users(id) NOT NULL,
  sent_to INT REFERENCES users(id) NOT NULL
);

-- join table to show who has requested who to be their friend- 
-- to chat with someone they have to also have 'sent' you a frined request
CREATE TABLE friends (
  id SERIAL PRIMARY KEY UNIQUE NOT NULL,
  request_sent INT REFERENCES users(id) NOT NULL,
  request_received INT REFERENCES users(id) NOT NULL
);