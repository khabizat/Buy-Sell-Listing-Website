DROP TABLE IF EXISTS shoes CASCADE;

CREATE TABLE shoes (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  size INTEGER  NOT NULL,
  price INTEGER  NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE
);
