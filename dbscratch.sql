CREATE TABLE channels (
    code        text PRIMARY KEY,
    title       text,
    created_on date NOT NULL DEFAULT CURRENT_TIMESTAMP
);
