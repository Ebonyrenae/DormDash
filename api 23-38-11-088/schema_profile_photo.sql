-- Run on your users table. If column already exists, ignore "Duplicate column" error.
ALTER TABLE users ADD COLUMN profile_photo VARCHAR(255) DEFAULT NULL;
