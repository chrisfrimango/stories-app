
DROP TABLE IF EXISTS blog.posts;
DROP TABLE IF EXISTS blog.categories;
DROP TABLE IF EXISTS blog.users;

DROP SCHEMA IF EXISTS blog CASCADE;


CREATE SCHEMA blog;


CREATE TABLE blog.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE blog.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE blog.posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES blog.users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES blog.categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_users_username ON blog.users(username);
CREATE INDEX idx_users_email ON blog.users(email);

CREATE INDEX idx_posts_user_id ON blog.posts(user_id);
CREATE INDEX idx_posts_category_id ON blog.posts(category_id);
CREATE INDEX idx_posts_created_at ON blog.posts(created_at DESC);

CREATE INDEX idx_categories_name ON blog.categories(name);


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON blog.posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


INSERT INTO blog.users (username, email, password, bio) VALUES
('testuser', 'test@example.com',
 '$2b$10$zqWTCwxoQoODWrCa1RGNZeYmMV2yLJOmqukAECB8r94fTE99F6OAC',
 'This is a test user bio'
);


INSERT INTO blog.categories (name) VALUES
('Technology'),
('Travel'),
('Food'),
('Lifestyle');


INSERT INTO blog.posts (title, content, user_id, category_id) VALUES
('Getting Started with Node.js',
'This is a comprehensive guide to getting started with Node.js development.

In this post, we will cover the basics of Node.js, including:
- Installation and setup
- Basic concepts
- Creating your first server
- Working with npm packages

Stay tuned for more content!',
1, -- user_id (references the test user)
1  -- category_id (references the Technology category)
);
