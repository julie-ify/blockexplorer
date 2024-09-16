// Fetch the latest 5 blocks number
export async function getLast5Blocks(provider) {
	const latestBlockNumber = await provider.getBlockNumber();
	const blockPromises = [];
	for (let i = 0; i < 5; i++) {
		blockPromises.push(provider.getBlock(latestBlockNumber - i));
	}
	const blocks = await Promise.all(blockPromises);
	return blocks;
}
