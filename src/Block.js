import React, { useEffect, useState } from 'react';
import { Utils } from 'alchemy-sdk';
import alchemy from './myUtils.js/config';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { formatValue } from './myUtils.js/formatValue';
import TimeAgo from 'react-timeago';

function Block() {
	const { pathname } = useLocation();
	const blockID = pathname.split('/')[2];

	const [block, setBlock] = useState(null);

	useEffect(() => {
		const getBlockWithTransactions = async () => {
			const blockWithTransactions = await alchemy.core.getBlock(
				parseInt(blockID)
			);
			setBlock(blockWithTransactions);
		};

		getBlockWithTransactions();
	}, [blockID]);

	return (
		<section>
			{block === null && <div>loading...</div>}
			{block !== null && (
				<div className="wrapper">
					<div className="block-flex">
						<p>Block Height:</p>
						<p>{block.number}</p>
					</div>
					<div className="block-flex">
						<p>Timestamp:</p>
						<TimeAgo date={block.timestamp * 1000} />
					</div>
					<div className="block-flex">
						<p>Gas Limit:</p>
						<p>{formatValue(block.gasLimit._hex, Utils)}</p>
					</div>
					<ul>
						{block.transactions.map((transaction, i) => {
							return (
								<li key={i} className="wrap">
									<div className="block-flex">
										<p>{`No${i}`}</p>
										<Link to={`/tx/${transaction}`}>
											<p className="text-left">{transaction}</p>
										</Link>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</section>
	);
}

export default Block;
