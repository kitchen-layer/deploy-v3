// cp ../kitchen-dex-periphery/out/UniswapV3Factory.sol/UniswapV3Factory.json ./src/artifacts
import CustomUniswapV3Factory from '../artifacts/UniswapV3Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomUniswapV3Factory,
  contractName: 'UniswapV3Factory',
  bytecode: CustomUniswapV3Factory.bytecode.object
}

/* export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'v3CoreFactoryAddress',
  artifact: extendedArtifact
}) */

export const DEPLOY_V3_CORE_FACTORY = () => {
  throw new Error("Please deploy the V3 Core Factory manually from the kitchen dex periphery")
}