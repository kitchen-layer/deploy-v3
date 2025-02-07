// import V3Migrator from '@uniswap/v3-periphery/artifacts/contracts/V3Migrator.sol/V3Migrator.json'
import CustomV3Migrator from "../artifacts/V3Migrator.json";
import createDeployContractStep from "./meta/createDeployContractStep";

const extendedArtifact = {
	...CustomV3Migrator,
	contractName: "V3Migrator",
	bytecode: CustomV3Migrator.bytecode,
};

export const DEPLOY_V3_MIGRATOR = createDeployContractStep({
	key: "v3MigratorAddress",
	artifact: extendedArtifact,
	computeArguments(state, config) {
		if (state.v3CoreFactoryAddress === undefined) {
			throw new Error("Missing V3 Core Factory");
		}
		if (state.nonfungibleTokenPositionManagerAddress === undefined) {
			throw new Error("Missing NonfungiblePositionManager");
		}
		return [
			state.v3CoreFactoryAddress,
			config.weth9Address,
			state.nonfungibleTokenPositionManagerAddress,
		];
	},
});
