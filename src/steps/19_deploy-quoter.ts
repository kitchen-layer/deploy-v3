// cp ../kitchen-dex-periphery/out/Quoter.sol/Quoter.json ./src/artifacts
import CustomQuoter from '../artifacts/Quoter.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomQuoter,
  contractName: 'Quoter',
  bytecode: CustomQuoter.bytecode.object
}

export const DEPLOY_QUOTER = createDeployContractStep({
  key: 'quoterAddress',
  artifact: extendedArtifact,
  computeArguments(state, config) {
    if (state.v3CoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    return [state.v3CoreFactoryAddress, config.weth9Address]
  },
})
