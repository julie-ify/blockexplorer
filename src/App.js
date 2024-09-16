import { Route, Switch } from 'react-router-dom';
import BlockList from './pages/BlockList';
import Block from './pages/Block';
import Account from './pages/Account';
import Transaction from './pages/Transaction';
import './App.css';

function App() {
	return (
		<main className="container">
			<Switch>
				<Route exact path="/" component={BlockList} />
				<Route path="/block/:block" component={Block} />
				<Route path="/tx/:hash" component={Transaction} />
				<Route path="/account" component={Account} />
			</Switch>
		</main>
	);
}

export default App;
