import NFTDescriptor from  '../artifacts/NFTDescriptor.json'
import createDeployLibraryStep from './meta/createDeployLibraryStep'

const extendedArtifact = {
  ...NFTDescriptor,
  contractName: 'NFTDescriptor',
  bytecode: NFTDescriptor.bytecode.object,
}

export const DEPLOY_NFT_DESCRIPTOR_LIBRARY_V1_3_0 = createDeployLibraryStep({
  key: 'nftDescriptorLibraryAddressV1_3_0',
  artifact: extendedArtifact,
})
