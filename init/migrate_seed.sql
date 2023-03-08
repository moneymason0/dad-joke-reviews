CREATE TABLE IF NOT EXISTS jokes(
    id serial NOT NULL, 
    joke_question text,
    joke_answer text,    
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reviews(
    id serial NOT NULL, 
    joke_id int NOT NULL,
    review_rating int NOT NULL, 
    name varchar(20),
    PRIMARY KEY (id),
    FOREIGN KEY (joke_id) REFERENCES jokes(id)
);

INSERT INTO jokes (joke_question, joke_answer) VALUES ('My wife said I should do lunges to stay in shape.', 'That would be a big step forward.');
INSERT INTO jokes (joke_question, joke_answer) VALUES ('Why do fathers take an extra pair of socks when they go golfing?', 'In case they get a hole in one!');
INSERT INTO jokes (joke_question, joke_answer) VALUES ('Singing in the shower is fun until you get soap in your mouth', 'Then its a soap opera.');
INSERT INTO jokes (joke_question, joke_answer) VALUES ('What do a tick and the Eiffel Tower have in common?', 'Theyre both Paris sites.');

INSERT INTO reviews (joke_id, review_rating, name) VALUES (2, 5, 'Mason');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (2, 5, 'Tracy');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (2, 5, 'Max');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (4, 4, 'Matt');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (4, 5, 'Stephanie');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (4, 3, 'Louis');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (4, 5, 'Rick');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (4, 2, 'Sarah');
INSERT INTO reviews (joke_id, review_rating, name) VALUES (3, 1, 'Stacy');



