import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { InputNumber } from 'antd';

//const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';


function disabledDate(current) {
	let start = moment('2020-11-00').format(dateFormat);
	let end = moment('2021-04-00').format(dateFormat);
	if (current < moment(start)) {
		return true;
	}
	else if (current > moment(end)) {
		return true;
	}
	else {
		return false;
	}
}


export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			percent: 30,
			recMovies: []
		}

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.handlePercentChange = this.handlePercentChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
		this.disabledDate = this.disabledDate.bind(this);
	}

	handleMovieNameChange(date, dateString) {
		this.setState({
			//movieName: e.target.value
			movieName: dateString
		});
	}

	handlePercentChange(value) {
		console.log(value);
		this.setState({
			//movieName: e.target.value
			percent: value
		});
	}

	disabledDate(current) {
		console.log(current);
		return current && current < moment().endOf('day');
		let start = moment('2020-11-00').format(dateFormat);
		let end = moment('2021-04-00').format(dateFormat);
		if (current < moment(start)) {
			return true;
		}
		else if (current > moment(end)) {
			return true;
		}
		else {
			return false;
		}
	}

	/* ---- Q2 (Recommendations) ---- */
	submitMovie() {
		fetch("http://localhost:8081/recommendations" + "/" + this.state.movieName + "/" + this.state.percent,
			//new URLSearchParams({
			//	recc: this.state.movieName,
			//	percent: this.state.percent,
			//}),
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
				let topListDivs = topList.map((i) => <RecommendationsRow county={i.county} infection_rate={i.infection_rate} death_rate={i.death_rate} />);
				this.setState({
					recMovies: topListDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	}

	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	//submitMovie() {

	//}

	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />

				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Infection and Death Stats for Underpreviliged Counties </div>
						<br></br>
						<div className="h6">What is the infection rate and death rate in the underprivileged counties (e.g. poverty rate>30%) in a particular day (e.g. 2020-12-01)?</div>
						<div className="h6">Enter a date between Dec 2020 and Feb 2021.</div>
						<div className="input-container">
							<Space direction="vertical">
								<DatePicker onChange={this.handleMovieNameChange} id="movieName" className="movie-input" disabledDate={this.disabledDate} />
							</Space>
							<InputNumber min={1} max={50} defaultValue={this.state.percent} onChange={this.handlePercentChange} />
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
						</div>
						<div className="header-container">
							<div className="headers">
								<div className="header"><strong>County</strong></div>
								<div className="header"><strong>Infection Rate</strong></div>
								<div className="header"><strong>Death Rate</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.recMovies}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
