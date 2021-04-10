var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
  SELECT DISTINCT genre FROM Genres;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var input = req.params.genre;
  console.log('hi');
  console.log(req);
  var query = `
  SELECT title, rating, vote_count
  FROM Movies 
  JOIN Genres ON Movies.id=Genres.movie_id 
  WHERE Genres.genre= '${input}'
  ORDER BY rating DESC, vote_count DESC 
  LIMIT 10;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  console.log(req);
  var input = req.params.recc;
  var query = `
  WITH Temp AS (SELECT genre
    FROM Genres
    JOIN Movies
    ON Genres.movie_id = Movies.id
    WHERE Movies.title='${input}')
    
    SELECT Movies.title, Movies.id, Movies.rating, Movies.vote_count
    FROM Movies
    WHERE Movies.title!= '${input}' AND Movies.id IN (
    SELECT Movies.id
    FROM Movies
    JOIN Genres ON Genres.movie_id = Movies.id
    RIGHT JOIN Temp ON Genres.genre = Temp.genre
    GROUP BY Movies.id
    HAVING COUNT(*)=(SELECT COUNT(*) FROM Temp)
    )
    ORDER BY rating DESC, vote_count DESC
    LIMIT 5;
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
  var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var input = req.params.decade;
  console.log(input);
  var query = `
  WITH Temp AS (SELECT id, (FLOOR(release_year/10)*10) AS decade FROM Movies),
Temp2 AS (SELECT DISTINCT genre FROM Genres)
SELECT Temp2.genre, IFNULL(avg_rating, 0) AS avg_rating
FROM (SELECT genre, AVG(rating) AS avg_rating
FROM Movies
JOIN Temp ON Temp.id=Movies.id
JOIN Genres ON Genres.movie_id=Movies.id
WHERE Temp.decade='${input}'
GROUP BY genre) F
RIGHT JOIN Temp2 ON Temp2.genre=F.genre
ORDER BY avg_rating DESC, genre ASC;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllGenres: getAllGenres,
  getTopInGenre: getTopInGenre,
  getRecs: getRecs,
  getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}