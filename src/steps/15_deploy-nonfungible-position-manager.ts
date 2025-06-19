// cp ../kitchen-dex-periphery/out/NonfungiblePositionManager.sol/NonfungiblePositionManager.json ./src/artifacts
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
  computeArguments(state) {
    if (state.v3CoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.descriptorProxyAddress === undefined) {
      throw new Error('Missing NonfungibleTokenDescriptorProxyAddress')
    }
    if (state.nftTimelockAddress === undefined) {
      throw new Error('Missing NFT Timelock')
    }

    throw new Error("Please deploy the Nonfungible Position Manager manually from the kitchen dex periphery")
  },
})
