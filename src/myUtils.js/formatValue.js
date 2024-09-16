// format transaction value from hex to bigNum (wei) then to ether
// then to 5 decimal place or 0
export const formatValue = (hex, utils) => {
	const hexValue = parseInt(hex);
	const formatUnits = Number(utils.formatUnits(hexValue.toString()));
	const formattedEtherValue =
		formatUnits % 1 === 0 ? formatUnits.toString() : formatUnits.toFixed(5);
	return formattedEtherValue;
};
