import { Utils } from 'alchemy-sdk';
import alchemy from './myUtils.js/config';
import { useEffect, useState } from 'react';
import { formatValue } from './myUtils.js/formatValue';
import { getLast5Blocks } from './myUtils.js/lastFiveBlocks';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import TimeAgo from 'react-timeago';

function BlockList() {
	const [blockData, setBlockData] = useState([]);

	useEffect(() => {
		const getLastBlocks = async () => {
			const blocks = await getLast5Blocks(alchemy.core);
			setBlockData(blocks);
		};
		getLastBlocks();
	}, []);

	return (
		<main className="container">
			{blockData === null && <div>loading...</div>}
			{blockData.length > 0 && (
				<div className="wrapper">
					<ul>
						{blockData.map((block) => {
							return (
								<li key={block.number} className="wrap">
									<div className="ds-flex-column fixed-width">
										<Link to={`/block/${block.number}`}>
											<p>{block.number}</p>
										</Link>
										<TimeAgo date={block.timestamp * 1000} />
									</div>
									<div className="ds-flex-column fixed-width">
										<p>
											{`Fee Recipient ${block.miner
												.toString()
												.slice(0, 10)}...`}
										</p>
										<p>{block.transactions.length} txns</p>
									</div>
									<div className="ds-flex-column fixed-width">
										<p>{formatValue(block.baseFeePerGas, Utils)} Eth</p>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</main>
	);
}

export default BlockList;
