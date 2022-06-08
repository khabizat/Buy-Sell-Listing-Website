DROP TABLE IF EXISTS shoes CASCADE;

CREATE TABLE shoes (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  size INTEGER  NOT NULL,
  price INTEGER  NOT NULL,
  photo_url VARCHAR(255)  DEFAULT 'https://images.pexels.com/photos/7004739/pexels-photo-7004739.jpeg',
  is_sold BOOLEAN NOT NULL DEFAULT FALSE
);
