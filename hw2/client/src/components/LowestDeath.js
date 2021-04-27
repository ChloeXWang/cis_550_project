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
		sorter: (a, b) => a.county.localeCompare(b.county),
		render: text => <a>{text}</a>,
		//render: (text, record) => <a href={"/" + record.state} >{text}</a>,
	},
	{
		title: 'State',
		dataIndex: 'state',
		key: 'state',
		sorter: (a, b) => a.state.localeCompare(b.state),
		//TODO: insert a link and have another route to render a new page
		render: text => <a href="/worst_day">{text}</a>,
	},
	{
		title: 'Death Toll',
		dataIndex: 'allDeaths',
		key: 'allDeaths',
		sorter: (a, b) => a.allDeaths - b.allDeaths,
	},
	{
		title: 'Population',
		dataIndex: 'pop',
		key: 'pop',
		sorter: (a, b) => a.pop - b.pop,
	},
	{
		title: '% With Bachelors or Higher',
		dataIndex: 'degree',
		key: 'degree',
		//TODO: rename column in the query in the router
		sorter: (a, b) => a.degree - b.degree,
	},
	{
		title: '% Unemployment',
		dataIndex: 'unemp',
		key: 'unemp',
		sorter: (a, b) => a.unemp - b.unemp,
	}
];


export default class LowestDeath extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		///test/:degree/:unemp/:pop/:topn
		this.state = {
			degree: 5,
			unemp: 5,
			pop: 100000,
			topn: 10,
			ret: []
		}

		this.handleDegreeChange = this.handleDegreeChange.bind(this);
		this.handleUnempChange = this.handleUnempChange.bind(this);
		this.handlePopChange = this.handlePopChange.bind(this);
		this.handleTopNChange = this.handleTopNChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
	}

	handleDegreeChange(value) {
		this.setState({
			degree: value
		});
	}

	handleUnempChange(value) {
		console.log(value);
		this.setState({
			unemp: value
		});
	}

	handlePopChange(value) {
		this.setState({
			pop: value
		});
	}

	handleTopNChange(value) {
		this.setState({
			topn: value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	submitMovie() {
		///test/:degree/:unemp/:pop/:topn
		fetch("http://localhost:8081/lowest_death" + "/" + this.state.degree +
			"/" + this.state.unemp + "/" + this.state.pop + "/" + this.state.topn,
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
