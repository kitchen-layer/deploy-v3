import CustomUniswapV2Factory from '../artifacts/UniswapV2Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomUniswapV2Factory,
  contractName: 'UniswapV2Factory',
  bytecode: CustomUniswapV2Factory.bytecode.object
}

export const DEPLOY_V2_FACTORY = createDeployContractStep({
  key: 'v2FactoryAddress',
  artifact: extendedArtifact,
  computeArguments: (_, config) => {
    return [config.ownerAddress]
  },
})
