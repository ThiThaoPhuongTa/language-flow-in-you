-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning entries table
CREATE TABLE IF NOT EXISTS learning_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(50) NOT NULL,
  original_text TEXT NOT NULL,
  pronunciation_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pronunciation cache (shared across all users)
CREATE TABLE IF NOT EXISTS pronunciation_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language VARCHAR(50) NOT NULL,
  word VARCHAR(255) NOT NULL,
  ipa VARCHAR(500) NOT NULL,
  audio_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language, word)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_learning_entries_user_id ON learning_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_entries_created_at ON learning_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_pronunciation_cache_language_word ON pronunciation_cache(language, word);