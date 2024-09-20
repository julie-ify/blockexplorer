import { Utils } from 'alchemy-sdk';
import alchemy from './config';
import { id } from 'ethers';

// Define the ERC-20 Transfer event signature
const ERC20_TRANSFER_TOPIC = id('Transfer(address,address,uint256)');

// The start of the year timestamp (January 1st of this year)
const startOfYear = Math.floor(
	new Date(new Date().getFullYear(), 0, 1).getTime() / 1000
);

async function getTransfersReceived(address) {
	try {
		// Get the latest block number
		const latestBlock = await alchemy.core.getBlockNumber();
		// const startBlock = await alchemy.core.getBlockNumber(startOfYear);

		// Fetch logs for the Transfer event where the recipient is the target address
		const logs = await alchemy.core.getLogs({
			fromBlock: Utils.hexValue(latestBlock - 100000),
			toBlock: 'latest',
			topics: [
				ERC20_TRANSFER_TOPIC,
				null, // Sender (any)
				Utils.hexZeroPad(address, 32), // Recipient address padded to the left to length bytes.
			],
		});

		const transfers = logs.map((log) => {
      return {
        sender: log.topics[1],
        recipient: log.data[1],
        amount: Utils.formatUnits(log.data[2], 18),
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
      };
		});

		return transfers;
	} catch (error) {
		console.error('Error fetching transfer logs:', error);
	}
}

export default getTransfersReceived;
