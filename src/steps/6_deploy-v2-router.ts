import CustomUniswapV2Router from '../artifacts/UniswapV2Router02.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomUniswapV2Router,
  contractName: 'UniswapV2Router',
  bytecode: CustomUniswapV2Router.bytecode
}

  export const DEPLOY_V2_ROUTER = createDeployContractStep({
  key: 'v2RouterAddress',
  artifact: extendedArtifact,
  computeArguments: (state, config) => {
    if (!state.v2FactoryAddress) {
      throw new Error('Missing V2 Factory')
    }
    return [state.v2FactoryAddress, config.weth9Address]
  },
})
