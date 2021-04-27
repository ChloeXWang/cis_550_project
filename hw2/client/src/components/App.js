import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import MostEducated from './MostEducated';
import TopN from './TopN';
import { OmitProps } from 'antd/lib/transfer/ListBody';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard/>
							)}
						/>
						<Route
							path="/test"
							render={() => (
								<TopN />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/recommendations"
							render={() => (
								<Recommendations />
							)}
						/>
						<Route
							path="/mosteducated"
							render={() => (
								<MostEducated />
							)}
						/>
						<Route
							exact
							path="/:state"
							render={(props) => (
								<Dashboard state = {props.match.params.state}/>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}