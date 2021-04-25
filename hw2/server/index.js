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
app.get('/recommendations/:recc/:percent', routes.getRecs);




/* ---- (Best Genre) ---- */
//app.get('/decades', routes.getDecades);






/* ---- Q3b (Best Genre) ---- */
app.get('/decades/:decade', routes.bestGenresPerDecade);


/* ---- Query 4 ---- */
app.get('/test/:degree/:unemp/:pop/:topn', routes.getTopN);





app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});