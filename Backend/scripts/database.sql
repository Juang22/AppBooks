-- tables
-- Table: books
DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
    id_book SERIAL CONSTRAINT books_pk PRIMARY KEY,
    title varchar(255)  NOT NULL,
    author varchar(50)  NOT NULL,
    category varchar(50)  NOT NULL,
    description varchar(512)  NOT NULL,
    release_year varchar(4)  NOT NULL,
    url_image varchar(512)  NOT NULL
);

-- Table: tokens
DROP TABLE IF EXISTS tokens;
CREATE TABLE tokens (
    token varchar(511)  NOT NULL,
    expiration_date timestamp  NOT NULL,
    users_id_user int  NOT NULL
);

-- Table: user_books
DROP TABLE IF EXISTS user_books;
CREATE TABLE user_books (
    id_user_books SERIAL CONSTRAINT user_books_pk PRIMARY KEY,
    books_id_book int  NOT NULL,
    users_id_user int  NOT NULL
);

-- Table: users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id_user SERIAL CONSTRAINT users_pk PRIMARY KEY,
    username varchar(255)  NOT NULL,
    first_name varchar(255)  NULL,
    last_name varchar(255)  NULL,
    password varchar(512)  NOT NULL,
    email varchar(255)  NULL,
    phone varchar(255)  NULL,
    address varchar(255) NULL
);

-- foreign keys
-- Reference: tokens_users (table: tokens)
ALTER TABLE tokens ADD CONSTRAINT tokens_users
    FOREIGN KEY (users_id_user)
    REFERENCES users (id_user)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: user_books_books (table: user_books)
ALTER TABLE user_books ADD CONSTRAINT user_books_books
    FOREIGN KEY (books_id_book)
    REFERENCES books (id_book)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: user_books_users (table: user_books)
ALTER TABLE user_books ADD CONSTRAINT user_books_users
    FOREIGN KEY (users_id_user)
    REFERENCES users (id_user)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;