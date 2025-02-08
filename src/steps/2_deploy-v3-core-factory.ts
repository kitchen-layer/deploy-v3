// import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'
import CustomUniswapV3Factory from '../artifacts/UniswapV3Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomUniswapV3Factory,
  contractName: 'UniswapV3Factory',
  bytecode: CustomUniswapV3Factory.bytecode.object
}

export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'v3CoreFactoryAddress',
  artifact: extendedArtifact
})
