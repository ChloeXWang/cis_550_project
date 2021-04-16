import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: []
    }

    this.showMovies = this.showMovies.bind(this);
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    fetch("http://localhost:8081/genres/" + genre,
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
        //console.log(res);
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(topList => {
        let topListDivs = topList.map((i) => <DashboardMovieRow title={i.title} rating={i.rating} vote_count={i.vote_count} />);
        this.setState({
          movies: topListDivs
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  render() {
    return (
      <div className="Dashboard" >

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Worst Covid Day Per State</div>
            <div className="genres-container">
              {this.state.genres}
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>State</strong></div>
                <div className="header"><strong>Date</strong></div>
                <div className="header"><strong>Number of Cases</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.movies}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}