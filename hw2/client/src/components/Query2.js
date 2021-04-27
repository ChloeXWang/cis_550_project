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
import { Table, Tag} from 'antd';
import { Slider, Switch } from 'antd';

//const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
  {
    title: 'County',
    dataIndex: 'county',
    key: 'county',
    sorter: (a, b) => a.county.localeCompare(b.county),
    //TODO: insert a link and have another route to render a new page
    render: text => <a href="/recommendations">{text}</a>,
  },
  {
    title: 'Infection Rate',
    dataIndex: 'infection_rate',
    key: 'infection_rate',
	sorter: (a, b) => a.infection_rate - b.infection_rate,
  },
  {
    title: 'Death Rate',
    dataIndex: 'death_rate',
    key: 'death_rate',
    //TODO: rename column in the query in the router
    sorter: (a, b) => a.death_rate - b.death_rate,
  },
  {
    title: 'Total Cases',
    dataIndex: 'totalCases',
    key: 'totalCases',
    //TODO: rename column in the query in the router
    sorter: (a, b) => a.totalCases - b.totalCases,
  },
  {
    title: 'UnEmplyement Rate',
    dataIndex: 'UnEmployement_Rate_2019',
    key: 'UnEmployement_Rate_2019',
    //TODO: rename column in the query in the router
    sorter: (a, b) => a.UnEmployement_Rate_2019 - b.UnEmployement_Rate_2019,
  },
  
];


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


export default class Query2 extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			percent: 30,
			recMovies: [],
			recFilter:[],
            topCountries:0,
			UnemploymentRate:0
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
		//return current && current < moment().endOf('day');
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
				//let topListDivs = topList.map((i) => <RecommendationsRow county={i.county} infection_rate={i.infection_rate} death_rate={i.death_rate} />);
				this.setState({
					recFilter: topList
				});
				this.setState({
					recMovies: topList
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
    getRecords(){
        fetch("http://localhost:8081/recommendations" + "/" + this.state.topCountries,
			//new URLSearchParams({
			//	recc: this.state.movieName,
			//	percent: this.state.percent,
			//}),
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				// return res.json();
				console.log(res,"data");
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(topList => {
				//let topListDivs = topList.map((i) => <RecommendationsRow county={i.county} infection_rate={i.infection_rate} death_rate={i.death_rate} />);
				this.setState({
					recMovies: topList
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
    }
    handleChange = e => {
		// console.log(e)
		// this.state.	recFilter
		var data = [];
		var items =this.state.recMovies.slice(0,e).map(i => { 
			data.push(i);
		});
		this.setState({ recFilter: data});

        this.setState({ topCountries: e});
    };
	handleUnemploymentRate=e=>{
		if (this.state.topCountries > 0) {
			var data = [];
			var items =this.state.recMovies.slice(0,this.state.topCountries).map(i => { 
				data.push(i);
			});
			// this.setState({ recFilter: data});
	
			var items =data.filter(item=>item.UnEmployement_Rate_2019 == e)
				// console.log(items);
					this.setState({ recFilter: items});
			}
		else{
			var items =this.state.recFilter.filter(item=>item.UnEmployement_Rate_2019 == e)
			this.setState({ recFilter: items});
		}
		this.setState({ UnemploymentRate: e});

	}
	render() {
        const { topCountries,UnemploymentRate } = this.state;
		return (
            
			<div className="Recommendations">
		

            	<PageNavbar active="recommendations" />
                
				<div className="container recommendations-container">
					<div className="jumbotron">
						<div>
						<h6>Top {topCountries} Most Affected Counties </h6>
                        <Slider   onChange={this.handleChange} />
						</div>
						<div>
						<h6>Unemployment rate {UnemploymentRate}</h6>
                        <Slider  max={10} step={0.1}  onChange={this.handleUnemploymentRate} />
						</div>
						<div className="h5">Infection and Death Stats for Underpreviliged Counties </div>
						<br></br>
						<div className="h6">What is the infection rate and death rate in the underprivileged counties (e.g. poverty rate>30%) in a particular day (e.g. 2020-12-01)?</div>
						<div className="h6">Enter a date between Dec 2020 and Feb 2021.</div>
						<div className="input-container">
							<Space direction="vertical">
								<DatePicker onChange={this.handleMovieNameChange} id="movieName" className="movie-input" disabledDate={this.disabledDate} />
							</Space>
							<InputNumber min={1} max={100} defaultValue={this.state.percent} onChange={this.handlePercentChange} />
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
						</div>
						<div className="header-container">
						<Table columns={columns} dataSource={this.state.recFilter} />
						</div>
						<div className="results-container" id="results">
						</div>
					</div>
				</div>
			</div>
		);
	}
}
