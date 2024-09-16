import { Route, Switch } from 'react-router-dom';
import BlockList from './BlockList';
import Block from './Block';
import Transaction from './Transaction';
import './App.css';

function App() {
	return (
		<main className="container">
			<Switch>
				<Route exact path="/" component={BlockList} />
				<Route path="/block/:block" component={Block} />
				<Route path="/tx/:hash" component={Transaction} />
			</Switch>
		</main>
	);
}

export default App;
