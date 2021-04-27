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
import Query2 from './Query2'
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
							path="/lowest_death"
							render={() => (
								<TopN />
							)}
						/>
						<Route
							exact
							path="/worst_day"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/underprivileged_infection"
							render={() => (
								<Query2 />
								// <Recommendations />
							)}
						/>
						<Route
							path="/underpriveleged_day"
							render={() => (
								<Recommendations />
							)}
						/>
						<Route
							path="/most_educated"
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
