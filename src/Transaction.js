import React, { useEffect, useState } from 'react';
import { Utils } from 'alchemy-sdk';
import alchemy from './myUtils.js/config';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { formatValue } from './myUtils.js/formatValue';
import TimeAgo from 'react-timeago';

function Transaction() {
	const { pathname } = useLocation();
	const txHash = pathname.split('/')[2];

	const [transaction, setTransaction] = useState(null);
	const [txStatus, setTxStatus] = useState(0);

	useEffect(() => {
		const getTransactionReceipt = async () => {
			const txReceipt = await alchemy.core.getTransactionReceipt(txHash);
			const _transaction = await alchemy.core.getTransaction(txHash);
			const { status } = txReceipt;
			setTransaction(_transaction);
			setTxStatus(status);
		};

		getTransactionReceipt();
	}, [txHash]);

	return (
		<section>
			{transaction === null && <div>loading...</div>}
			{transaction !== null && (
				<div className="wrapper">
					<div className="block-flex">
						<p>Transaction Hash:</p>
						<p>{transaction.hash}</p>
					</div>
					<div className="block-flex">
						<p>Status:</p>
						<p>{txStatus === 1 ? 'success' : 'failure'}</p>
					</div>
					<div className="block-flex">
						<p>Block:</p>
						<p>{transaction.blockNumber}</p>
					</div>
					<div className="block-flex">
						<p>Timestamp:</p>
						<TimeAgo date={transaction.timestamp * 1000} />
					</div>
					<div className="block-flex">
						<p>To:</p>
						<p>{`${transaction.to.slice(0, 9)}...${transaction.to.slice(
							-10
						)}`}</p>
					</div>
					<div className="block-flex">
						<p>From:</p>
						<p>{`${transaction.from.slice(0, 9)}...${transaction.from.slice(
							-10
						)}`}</p>
					</div>

					<div className="block-flex">
						<p>Value:</p>
						<p>{formatValue(transaction.value._hex, Utils)} ETH</p>
					</div>
					<div className="block-flex">
						<p>Gas Limit:</p>
						<p>{formatValue(transaction.gasLimit._hex, Utils)} ETH</p>
					</div>
				</div>
			)}
		</section>
	);
}

export default Transaction;
