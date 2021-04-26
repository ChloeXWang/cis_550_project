	import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestGenres from './BestGenres';
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
							exact
							path="/query1"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/query2"
							render={() => (
								<Query2 />
								// <Recommendations />
							)}
						/>
						<Route
							path="/query3"
							render={() => (
								<BestGenres />
							)}
						/>
							{/* <Route
							path="/query2Slide"
							render={() => (
								<Query2 />
							)}
						/> */}
						
					</Switch>
				</Router>
			</div>
		);
	}
}
