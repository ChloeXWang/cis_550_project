import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Table, Tag } from 'antd';
import { Select } from 'antd';
import { InputNumber } from 'antd';

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

const { Option } = Select;

function onBlur() {
	console.log('blur');
}
function onFocus() {
	console.log('focus');
}
function onSearch(val) {
	console.log('search:', val);
}

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
			ret: [],
			stateList: []
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
			state: value
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
		const options = this.state.stateList.map(d => <Option key={d.state}>{d.state}</Option>);
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />

				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Average Cases Per Day in The Most Educated Counties</div>
						<br></br>
						<div className="input-container">
							<div className="h6">State </div>
							<Select
        						placeholder="State"
								onBlur={onBlur}
        						onChange={this.handleStateChange}
      							>
        						<Option value="AL">AL</Option>
								<Option value="AK">AK</Option>
								<Option value="AZ">AZ</Option>
								<Option value="AR">AR</Option>
								<Option value="CA">CA</Option>
								<Option value="CO">CO</Option>
								<Option value="CT">CT</Option>
								<Option value="DE">DE</Option>
								<Option value="DC">DC</Option>
								<Option value="FL">FL</Option>
								<Option value="GA">GA</Option>
								<Option value="HI">HI</Option>
								<Option value="ID">ID</Option>
								<Option value="IL">IL</Option>
								<Option value="IN">IN</Option>
								<Option value="IA">IA</Option>
								<Option value="KS">KS</Option>
								<Option value="KY">KY</Option>
								<Option value="LA">LA</Option>
								<Option value="ME">ME</Option>
								<Option value="MD">MD</Option>
								<Option value="MA">MA</Option>
								<Option value="MI">MI</Option>
								<Option value="MN">MN</Option>
								<Option value="MS">MS</Option>
								<Option value="MO">MO</Option>
								<Option value="MT">MT</Option>
								<Option value="NE">NE</Option>
								<Option value="NV">NV</Option>
								<Option value="NH">NH</Option>
								<Option value="NJ">NJ</Option>
								<Option value="NM">NM</Option>
								<Option value="NY">NY</Option>
								<Option value="NC">NC</Option>
								<Option value="ND">ND</Option>
								<Option value="OH">OH</Option>
								<Option value="OK">OK</Option>
								<Option value="OR">OR</Option>
								<Option value="PA">PA</Option>
								<Option value="RI">RI</Option>
								<Option value="SC">SC</Option>
								<Option value="SD">SD</Option>
								<Option value="TN">TN</Option>
								<Option value="TX">TX</Option>
								<Option value="UT">UT</Option>
								<Option value="VT">VT</Option>
								<Option value="VA">VA</Option>
								<Option value="WA">WA</Option>
								<Option value="WV">WV</Option>
								<Option value="WI">WI</Option>
								<Option value="WY">WY</Option>
								<Option value="PR">PR</Option>
      						</Select>
							<div className="h6">Education Level</div>
							<Select defaultValue="Percent_of_adults_with_a_high_school_diploma_only_2014_18" style={{ width: 240 }} onChange={this.handleDegreeChange}>
								<Option value="Percent_of_adults_with_less_than_a_high_school_diploma_2014_18">Less than high school diploma</Option>
								<Option value="Percent_of_adults_with_a_high_school_diploma_only_2014_18">High school diploma only</Option>
      							<Option value="Percent_of_adults_comp_some_college_or_associates_degree_2014_18">Some college or associates degree</Option>
								<Option value="Percent_of_adults_with_a_bachelors_degree_or_higher_2014_18">Bachelor's degree or higher</Option>
							</Select>
							<div className="h6">Number of results to show</div>
							<InputNumber min={1} max={1000} defaultValue={15} onChange={this.handleTopNChange} />
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
						</div>
						<br></br>
						<div className="header-container">
							<div className="h5">Counties with Highest Education</div>
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
