import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {
	constructor(props) {
		super(props);
	}
	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			//{
			//	key: this.props.key, state: this.props.state, date: this.props.date, cases: this.props.cases
			//}
			<div className="movie">
				<div className="key">{this.props.key}</div>
				<div className="state">{this.props.state}</div>
				<div className="date">{this.props.date}</div>
				<div className="cases">{this.props.cases}</div>
			</div>
		);
	}
}
