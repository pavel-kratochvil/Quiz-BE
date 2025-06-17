CREATE TABLE changelogs (
  id bigserial not null,
  file_name varchar(255) not null
);

INSERT INTO changelogs (file_name) VALUES ('createDB.sql');