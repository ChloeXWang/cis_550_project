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
  WITH underprivileged AS(
    SELECT PovertyEstimates.FIPS_TXT
    FROM PovertyEstimates
    WHERE PovertyEstimates.PCTPOVALL_2019 > 30
    )
    SELECT cases.county, (cases/POP_ESTIMATE_2019) AS infection_rate, (deaths/POP_ESTIMATE_2019) AS death_rate
    FROM cases
    RIGHT JOIN underprivileged ON cases.fips=underprivileged.FIPS_TXT
    RIGHT JOIN PopulationEstimates ON underprivileged.FIPS_TXT=PopulationEstimates.FIPS_TXT
    WHERE cases.date='2020-12-01';
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
function getWorstDay(req, res) {
  var query = `
  WITH stateCases AS(
    SELECT state, date, SUM(Cases) AS cases
    FROM cases
    GROUP BY state, date
    ORDER BY cases DESC, state
    )
    SELECT state, date, MAX(cases) AS cases
    FROM stateCases
    GROUP BY state
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
    var input_recc = req.params.recc;
    console.log(input_recc);
    var input_percent = req.params.percent;
    console.log(input_percent);
    var query = `
    WITH underprivileged AS(
      SELECT PovertyEstimates.FIPS_TXT
      FROM PovertyEstimates
      WHERE PovertyEstimates.PCTPOVALL_2019 > '${input_percent}'
      ),
      worstCounties AS(
            SELECT fips, SUM(cases) as totalCases
            FROM covid19Cases
            GROUP BY fips
            ORDER BY totalCases DESC
            ),
        worst AS(SELECT * FROM worstCounties w 
        JOIN Education e ON w.fips = e.FIPS_CODE
        JOIN  UnEmployement u ON w.fips = u.FIPS_TXT )
        SELECT worst.*,cases.county, (cases/POP_ESTIMATE_2019) AS infection_rate, (deaths/POP_ESTIMATE_2019) AS death_rate
        FROM worst,cases
        RIGHT JOIN underprivileged ON cases.fips=underprivileged.FIPS_TXT
        RIGHT JOIN PopulationEstimates ON underprivileged.FIPS_TXT=PopulationEstimates.FIPS_TXT
        WHERE cases.date='${input_recc}'LIMIT 80;
      `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);
        }
    });
};


/* ---- (Best Genres) ---- */
function getStateCounty(req, res) {
  var state = req.params.state
  var query = `
    WITH stateCases AS(
      SELECT date, county, state, cases, deaths
      FROM cases
      WHERE state = '${state}'
    )
    SELECT county, MAX(date) AS date, MAX(Cases) AS cases, MAX(deaths) AS deaths
    FROM stateCases
    GROUP BY county
    ORDER BY cases DESC;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
}

function getStates(req, res) {
  var query = `
    SELECT DISTINCT STATE AS state
    FROM county;
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
function mostEducated(req, res) {
  var degree = req.params.degree;
  var state = req.params.state;
  var topn = req.params.topn
  var query = `
  WITH avgCases AS(
    SELECT fips, county, AVG(cases) AS casesPerDay
    FROM covid19Cases
    GROUP BY fips
    ),
    stats AS(
    SELECT *
    FROM avgCases a JOIN UnEmployement u ON a.fips = u.FIPS_TXT
      JOIN Education e ON a.fips = e.FIPS_CODE
    )
    SELECT county, state, casesPerDay, UnEmployed_2019, ${degree} AS degree
    FROM stats s JOIN county c ON s.fips = c.FIPS_TXT
    WHERE state = '${state}'
    ORDER BY degree DESC
    LIMIT ${topn};
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getUnderprivileged(req, res) {
  var query = `
  WITH underprivileged AS(
    SELECT PovertyEstimates.FIPS_TXT
    FROM PovertyEstimates
    WHERE PovertyEstimates.PCTPOVALL_2019 > 30
    )
    SELECT cases.county, (cases/POP_ESTIMATE_2019) AS infection_rate, (deaths/POP_ESTIMATE_2019) AS death_rate
    FROM cases
    RIGHT JOIN underprivileged ON cases.fips=underprivileged.FIPS_TXT
    RIGHT JOIN PopulationEstimates ON underprivileged.FIPS_TXT=PopulationEstimates.FIPS_TXT
    WHERE cases.date='2020-12-01';
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- Query 4 ---- */
function getTopN(req, res) {
  ///test/:degree/:unemp/:pop/:topn
  //console.log(req);
  var input_degree = req.params.degree;
  //console.log(input_recc);
  var input_unemp = req.params.unemp;
  var input_pop = req.params.pop;
  var input_topn = req.params.topn;
  //console.log(input_percent);
  var query = `
  WITH eligibleCounties AS (
    SELECT u.FIPS_TXT AS ecounties, UnEmployement_Rate_2019, p.POP_ESTIMATE_2019
    FROM UnEmployement u JOIN PopulationEstimates p ON u.FIPS_TXT=p.FIPS_TXT
    WHERE UnEmployement_Rate_2019 < '${input_unemp}' AND POP_ESTIMATE_2019 > '${input_pop}'
    ),
    countyDeaths AS (
    SELECT fips, SUM(deaths) AS allDeaths
    FROM covid19Cases
    GROUP BY fips
    )
    SELECT fips, allDeaths, Percent_of_adults_with_a_bachelors_degree_or_higher_2014_18
    FROM eligibleCounties e JOIN countyDeaths c ON e.ecounties = c.fips
      JOIN Education ON e.ecounties = Education.FIPS_CODE
      ORDER BY allDeaths
      LIMIT '${input_topn}';
    `;
  var query = `
  WITH eligibleCounties AS (
    SELECT u.FIPS_TXT AS ecounties, UnEmployement_Rate_2019 as unemp, p.POP_ESTIMATE_2019 as pop, e.Percent_of_adults_with_a_bachelors_degree_or_higher_2014_18 as degree
    FROM UnEmployement u JOIN PopulationEstimates p ON u.FIPS_TXT=p.FIPS_TXT
    JOIN Education e ON u.FIPS_TXT = e.FIPS_CODE
    WHERE UnEmployement_Rate_2019 < '${input_unemp}' 
    AND POP_ESTIMATE_2019 > '${input_pop}' 
    AND Percent_of_adults_with_a_bachelors_degree_or_higher_2014_18 > '${input_degree}'
    ),
    countyDeaths AS (
    SELECT fips, SUM(deaths) AS allDeaths
    FROM covid19Cases
    GROUP BY fips
    )
    SELECT Area_Name as county, STATE as state, allDeaths, pop, degree, unemp
    FROM eligibleCounties e JOIN countyDeaths c ON e.ecounties = c.fips
    JOIN county r ON e.ecounties = r.FIPS_TXT
    ORDER BY allDeaths ASC;
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
  getWorstDay: getWorstDay,
  getRecs: getRecs,
  getTopInGenre: getTopInGenre,
  getDecades: getDecades,
  getStateCounty: getStateCounty,
  getStates: getStates,
  mostEducated: mostEducated,
  getUnderprivileged: getUnderprivileged,
  getTopN: getTopN
}
