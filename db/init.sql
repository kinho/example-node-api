CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title varchar(20) NOT NULL,
  description text,
  author_id integer DEFAULT NULL,
  CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES users (id)
);
