// cp ../kitchen-dex-periphery/out/nftTimelock.sol/SimpleNFTTimelock.json ./src/artifacts
import SimpleNFTTimelock from  '../artifacts/SimpleNFTTimelock.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...SimpleNFTTimelock,
  contractName: 'SimpleNFTTimelock',
  bytecode: SimpleNFTTimelock.bytecode.object,
}

export const DEPLOY_NFT_TIMELOCK = createDeployContractStep({
  key: 'nftTimelockAddress',
  artifact: extendedArtifact,
})
