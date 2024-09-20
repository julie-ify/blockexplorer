import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { formatValue } from '../myUtils.js/formatValue';
import { Utils } from 'alchemy-sdk';
import alchemy from '../myUtils.js/config';
import getTransfersReceived from '../myUtils.js/TransactionsReceived';

function Account() {
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(null);
	const [log, setLog] = useState(null);

	return (
		<section className="container">
			<Form
				onSubmit={async (e) => {
					e.preventDefault();
					const hexValue = await alchemy.core.getBalance(account.toString());
					const value = formatValue(hexValue._hex, Utils);
					setBalance(value);

					const _log = await getTransfersReceived(account.toString());
					setLog(_log);
				}}
			>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Address or ENS name</Form.Label>
					<Form.Control
						type="text"
						placeholder="vitalik.eth or 0x..."
						onChange={(e) => setAccount(e.target.value)}
					/>
				</Form.Group>
				<Button variant="info" type="submit">
					Get Balance
				</Button>
			</Form>
			{balance !== null && (
				<>
					<div className="block-flex">
						<p>Account Balance:</p>
						<p>{balance} ETH</p>
					</div>

					<div className="block-flex">
						<p>
							Number of txns received by this account since 100,000 blocks ago
						</p>
						{log != null && <p>{log.length}</p>}
					</div>
				</>
			)}
		</section>
	);
}

export default Account;
