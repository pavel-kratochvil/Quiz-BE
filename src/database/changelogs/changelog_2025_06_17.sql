CREATE TABLE quiz (
    id bigserial primary key,
    name varchar(255) not null,
    description text,
    category varchar(100),
    difficulty varchar(50),
    is_published boolean default false,
    created_by varchar(100),
    time_limit integer,
    img varchar(255),
    date_created timestamp default current_timestamp
);

CREATE TABLE question (
    id bigserial primary key,
    text varchar(255) not null,
    answer varchar(255) not null,
    relevant_answers TEXT[],
    explanation text,
    question_type varchar(50) default 'text_input',
    points integer default 1,
    "order" integer,
    is_required boolean default false,
    img varchar(255),
    quiz_id bigint not null,
    date_created timestamp default current_timestamp,
    foreign key (quiz_id) references quiz(id)
);


/*
Rollback
DROP table quiz;
DROP table question;
*/