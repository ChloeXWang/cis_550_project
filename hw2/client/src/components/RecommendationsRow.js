import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="title">{this.props.county}</div>
				<div className="id">{this.props.infection_rate}</div>
				<div className="rating">{this.props.death_rate}</div>
			</div>
		);
	}
}
