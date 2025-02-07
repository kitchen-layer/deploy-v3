// import NonfungiblePositionManager from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
import NonfungiblePositionManager from '../artifacts/NonfungiblePositionManager.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...NonfungiblePositionManager,
  contractName: 'NonfungiblePositionManager',
  bytecode: NonfungiblePositionManager.bytecode.object,
}

export const DEPLOY_NONFUNGIBLE_POSITION_MANAGER = createDeployContractStep({
  key: 'nonfungibleTokenPositionManagerAddress',
  artifact: extendedArtifact,
  computeArguments(state, config) {
    if (state.v3CoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.descriptorProxyAddress === undefined) {
      throw new Error('Missing NonfungibleTokenDescriptorProxyAddress')
    }
    if (state.nftTimelockAddress === undefined) {
      throw new Error('Missing NFT Timelock')
    }

    return [state.v3CoreFactoryAddress, config.weth9Address, state.descriptorProxyAddress, state.nftTimelockAddress]
  },
})
