USE iTunes;

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE songs(
  id INT PRIMARY KEY AUTO_INCREMENT,
  song_name VARCHAR(255) NOT NULL UNIQUE,
  artist VARCHAR(255)
);

CREATE TABLE bought_songs(
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

INSERT INTO users (user_name, password) VALUES ("Alex", "alex");

INSERT INTO songs (song_name, artist) VALUES ("Too Drunk to Come", "together Pangea");
INSERT INTO songs (song_name, artist) VALUES ("Random Firl", "Late of the Pier");
INSERT INTO songs (song_name, artist) VALUES ("Meydei", "IDLES");
INSERT INTO songs (song_name, artist) VALUES ("The Wagon", "Dinosaur Jr.");
INSERT INTO songs (song_name, artist) VALUES ("El Chupa Nibre", "MF DOOM");

INSERT INTO bought_songs (user_id, song_id) VALUES (1, 3);

SELECT * FROM users;
SELECT * FROM songs;

SELECT users.user_name
FROM users
INNER JOIN bought_songs ON bought_songs.user_id = users.id
WHERE bought_songs.user_id = 1;
