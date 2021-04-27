const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/worstday', routes.getWorstDay);






/* ---- Q1b (Dashboard) ---- */
//app.get('/genres/:genre', () => { }); // Hint: Replace () => {} with the appropriate route handler.
app.get('/worstday/:state', routes.getStateCounty);






/* ---- Query 2 ---- */
app.get('/query2/:recc/:percent', routes.getRecs);



app.get('/query2/:recc', routes.getRecs);




/* ---- (Best Genre) ---- */
app.get('/mosteducated/:degree/:state/:topn', routes.mostEducated);



/* ---- Q3b (Best Genre) ---- */
//app.get('/mostEducated', routes.getStates);


/* ---- Lowest Death ---- */
app.get('/lowest_death/:degree/:unemp/:pop/:topn', routes.getTopN);

/* ---- Underpriveleged Day ---- */
app.get('/underprivileged_day/:date/:percent', routes.getUnderprivileged);



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
