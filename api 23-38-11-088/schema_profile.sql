-- Run on your users table. If columns already exist, ignore "Duplicate column" errors.
ALTER TABLE users ADD COLUMN university VARCHAR(255) DEFAULT '';
ALTER TABLE users ADD COLUMN program VARCHAR(255) DEFAULT '';
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN experience TEXT;
