// import NonfungibleTokenPositionDescriptor from 'v3-periphery-1_3_0/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'
import CustomNonfungibleTokenPositionDescriptor from '../artifacts/NonfungibleTokenPositionDescriptor.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomNonfungibleTokenPositionDescriptor,
  contractName: 'NonfungibleTokenPositionDescriptor',
  bytecode: CustomNonfungibleTokenPositionDescriptor.bytecode
}

export const DEPLOY_NFT_POSITION_DESCRIPTOR_V1_3_0 = createDeployContractStep({
  key: 'nonfungibleTokenPositionDescriptorAddressV1_3_0',
  artifact: extendedArtifact,
  computeLibraries(state) {
    if (state.nftDescriptorLibraryAddressV1_3_0 === undefined) {
      throw new Error('NFTDescriptor library missing')
    }
    return {
      NFTDescriptor: state.nftDescriptorLibraryAddressV1_3_0,
    }
  },
  computeArguments(_, { weth9Address, nativeCurrencyLabelBytes }) {
    return [weth9Address, nativeCurrencyLabelBytes]
  },
})
