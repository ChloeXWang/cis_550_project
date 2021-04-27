import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { Table, Tag } from 'antd';
import { Slider } from 'antd';

//fips, allDeaths, Percent_of_adults_with_a_bachelors_degree_or_higher_2014_18
const columns = [
	{
		title: 'County',
		dataIndex: 'county',
		key: 'county',
		//sorter: (a, b) => a.fips - b.fips,
		sorter: (a, b) => a.county.localeCompare(b.county),
		//TODO: insert a link and have another route to render a new page
		render: text => <a href="/recommendations">{text}</a>,
	},
	{
		title: 'State',
		dataIndex: 'state',
		key: 'state',
		//sorter: (a, b) => a.fips - b.fips,
		sorter: (a, b) => a.state.localeCompare(b.state),
		//TODO: insert a link and have another route to render a new page
		render: text => <a href="/recommendations">{text}</a>,
	},
	{
		title: 'Cases Per Day',
		dataIndex: 'casesPerDay',
		key: 'casesPerDay',
		sorter: (a, b) => a.casesPerDay - b.casesPerDay,
	},
	{
		title: 'Number Unemployed',
		dataIndex: 'UnEmployed_2019',
		key: 'UnEmployed_2019',
		sorter: (a, b) => a.UnEmployed_2019 - b.UnEmployed_2019,
	},
	{
		title: '% Educated',
		dataIndex: 'degree',
		key: 'degree',
		//TODO: rename column in the query in the router
		sorter: (a, b) => a.degree - b.degree,
	}
];


export default class TopN extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		///test/:degree/:unemp/:pop/:topn
		this.state = {
			degree: "Percent_of_adults_with_a_high_school_diploma_only_2014_18",
			state: "PA",
			topn: 15,
			ret: []
		}

		this.handleDegreeChange = this.handleDegreeChange.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleTopNChange = this.handleTopNChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
	}

	handleDegreeChange(value) {
		this.setState({
			degree: value
		});
	}

	handleStateChange(value) {
		console.log(value);
		this.setState({
			unemp: value
		});
	}

	handleTopNChange(value) {
		this.setState({
			topn: value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	submitMovie() {
		///bestgenres/:degree/:state/:topn
		fetch("http://localhost:8081/bestgenres" + "/" + this.state.degree +
			"/" + this.state.state + "/" + this.state.topn,
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
				//let topListDivs = topList.map((i) => <RecommendationsRow county={i.county} infection_rate={i.infection_rate} death_rate={i.death_rate} />);
				this.setState({
					ret: topList
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
						<div className="h5">Death Stats</div>
						<br></br>
						<div className="h6">Counties with lowest death with filters</div>
						<div className="input-container">
							<div className="h6">Population greater than </div>
							<Slider min={1} max={10000000} defaultValue={this.state.pop} onChange={this.handlePopChange} />
							<div className="h6">Education (% With Bachelor's or Higher) greater than </div>
							<Slider min={0} max={100} defaultValue={this.state.degree} onChange={this.handleDegreeChange} />
							<div className="h6">Unemployment rate (%) less than</div>
							<Slider min={0} max={100} defaultValue={this.state.unemp} onChange={this.handleUnempChange} />
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
						</div>
						<div className="header-container">
							<Table columns={columns} dataSource={this.state.ret} />
						</div>
						<div className="results-container" id="results">
						</div>
					</div>
				</div>
			</div>
		);
	}
}
