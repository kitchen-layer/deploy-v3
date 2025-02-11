// cp ../kitchen-swap-router-contracts/out/QuoterV2.sol/QuoterV2.json ./src/artifacts
import CustomQuoterV2 from '../artifacts/QuoterV2.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomQuoterV2,
  contractName: 'QuoterV2',
  bytecode: CustomQuoterV2.bytecode.object
}

export const DEPLOY_QUOTER_V2 = createDeployContractStep({
  key: 'quoterV2Address',
  artifact: extendedArtifact,
  computeArguments(state, config) {
    if (state.v3CoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    return [state.v3CoreFactoryAddress, config.weth9Address]
  },
})
