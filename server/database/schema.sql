CREATE SCHEMA users;

CREATE TABLE IF NOT EXISTS users.info (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE room1_messages (
  id UUID PRIMARY KEY,
  channel VARCHAR(255),
  author VARCHAR(255),
  text TEXT,
  timestamp TIMESTAMPTZ
);

CREATE TABLE room2_messages (
  id UUID PRIMARY KEY,
  channel VARCHAR(255),
  author VARCHAR(255),
  text TEXT,
  timestamp TIMESTAMPTZ
);

CREATE TABLE room3_messages (
  id UUID PRIMARY KEY,
  channel VARCHAR(255),
  author VARCHAR(255),
  text TEXT,
  timestamp TIMESTAMPTZ
);

CREATE TABLE room4_messages (
  id UUID PRIMARY KEY,
  channel VARCHAR(255),
  author VARCHAR(255),
  text TEXT,
  timestamp TIMESTAMPTZ
);

CREATE TABLE room5_messages (
  id UUID PRIMARY KEY,
  channel VARCHAR(255),
  author VARCHAR(255),
  text TEXT,
  timestamp TIMESTAMPTZ
);