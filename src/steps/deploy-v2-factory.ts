import UniswapV2Factory from '@uniswap/v2-core/build/UniswapV2Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...UniswapV2Factory,
  contractName: 'UniswapV2Factory',
  bytecode: UniswapV2Factory.evm.bytecode.object
}

export const DEPLOY_V2_FACTORY = createDeployContractStep({
  key: 'v2FactoryAddress',
  artifact: extendedArtifact,
  computeArguments: (_, config) => {
    return [config.ownerAddress]
  },
})
