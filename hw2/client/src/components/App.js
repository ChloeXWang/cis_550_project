import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import UnderprivelegedDay from './UnderprivelegedDay';
import MostEducated from './MostEducated';
import LowestDeath from './LowestDeath';
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
								<Dashboard />
							)}
						/>
						<Route
							path="/lowest_death"
							render={() => (
								<LowestDeath />
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
							path="/underprivileged_day"
							render={() => (
								<UnderprivelegedDay />
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
								<Dashboard state={props.match.params.state} />
							)}
						/>

					</Switch>
				</Router>
			</div>
		);
	}
}
