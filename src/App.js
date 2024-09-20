import { Route, Switch } from 'react-router-dom';
import BlockList from './pages/BlockList';
import Block from './pages/Block';
import Account from './pages/Account';
import Transaction from './pages/Transaction';
import './App.css';
import NFT from './pages/NFT';

function App() {
	return (
		<main className="container">
			<Switch>
				<Route exact path="/" component={BlockList} />
				<Route path="/block/:block" component={Block} />
				<Route path="/tx/:hash" component={Transaction} />
				<Route path="/account" component={Account} />
				<Route path="/nft" component={NFT} />
			</Switch>
		</main>
	);
}

export default App;
