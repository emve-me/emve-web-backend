create table users (
  id bigserial primary key,
  google_id text not null unique,
  email text,
  email_verified boolean,
  picture text,
  first_name  text not null,
  last_name text not null,
  locale text,
  created_on date not null default current_timestamp
);

create table channels (
    id bigserial primary key,
    "name"       text,
    created_on date not null default current_timestamp,
    owner bigint not null references users(id)
);

create table tracks (
    id bigserial primary key,
    video_id text not null,
    title text not null,
    "time" int,
    owner bigint not null references users(id),
    channel bigint not null references channels(id),
    added_on date not null default current_timestamp,
    played boolean
);
