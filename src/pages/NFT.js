import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import alchemy from '../myUtils.js/config';

function NFT() {
	const [contractAddress, setContractAddress] = useState(null);
	const [tokenId, setTokenId] = useState(null);
	const [nftMetaData, setNftMetaData] = useState(null);
	const [nftFloorPrice, setNftFloorPrice] = useState(null);

	return (
		<section className="container">
			<p>Get NFT Metadata</p>

			<Form
				onSubmit={async (e) => {
					e.preventDefault();
					const response = await alchemy.nft.getNftMetadata(
						contractAddress,
						tokenId
					);
					setNftMetaData(response);
					const floorPrice = await alchemy.nft.getFloorPrice(contractAddress);
					setNftFloorPrice(floorPrice);
					console.log(floorPrice);
				}}
			>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Contract Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="0xe785E82358..."
						onChange={(e) => setContractAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Token Id</Form.Label>
					<Form.Control
						type="text"
						placeholder="1590"
						onChange={(e) => setTokenId(e.target.value)}
					/>
				</Form.Group>
				<Button variant="info" type="submit">
					Get Metadata
				</Button>
			</Form>
			{nftMetaData !== null && (
				<section className="wrapper">
					<div className="block-flex">
						<p>Contract address:</p>
						<p>{nftMetaData.contract.address}</p>
					</div>
					<div className="block-flex">
						<p>Contract name:</p>
						<p>{nftMetaData.contract.name}</p>
					</div>
					<div className="block-flex">
						<p>Contract symbol:</p>
						<p>{nftMetaData.contract.symbol}</p>
					</div>
					<div className="block-flex">
						<p>Contract total supply:</p>
						<p>{nftMetaData.contract.totalSupply}</p>
					</div>
					<div className="block-flex">
						<p>NFT type</p>
						<p>{nftMetaData.tokenType}</p>
					</div>
					<div className="block-flex">
						<p>NFT image</p>
						<img src={nftMetaData.media[0].thumbnail} />
					</div>
					<p>{console.log(nftFloorPrice)}</p>
					{nftFloorPrice != null && (
						<div className="block-flex">
							<p>Floor price</p>
							<p>{nftFloorPrice.openSea.floorPrice} ETH</p>
						</div>
					)}
				</section>
			)}
		</section>
	);
}

export default NFT;
