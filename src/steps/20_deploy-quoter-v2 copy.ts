// cp ../kitchen-swap-router-contracts/out/MixedRouteQuoterV1.sol/MixedRouteQuoterV1.json ./src/artifacts
import CustomMixedRouteQuoterV1 from '../artifacts/MixedRouteQuoterV1.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomMixedRouteQuoterV1,
  contractName: 'MixedRouteQuoterV1',
  bytecode: CustomMixedRouteQuoterV1.bytecode.object
}

export const DEPLOY_MIXED_ROUTE_QUOTER_V1 = createDeployContractStep({
  key: 'mixedRouteQuoterV1Address',
  artifact: extendedArtifact,
  computeArguments(state, config) {
    if (state.v3CoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.v2FactoryAddress === undefined) {
      throw new Error('Missing V2 Factory')
    }
    return [state.v3CoreFactoryAddress, state.v2FactoryAddress, config.weth9Address]
  },
})
