import FeeOnTransferDetector from '../artifacts/FeeOnTransferDetector.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...FeeOnTransferDetector,
  contractName: 'TransferDetector',
  bytecode: FeeOnTransferDetector.bytecode.object
}

export const DEPLOY_FEE_DETECTOR = createDeployContractStep({
  key: 'feeDetectorAddress',
  artifact: extendedArtifact,
  computeArguments(state) {
    if (state.v2FactoryAddress === undefined) {
      throw new Error('Missing V2 Factory')
    }
    return [state.v2FactoryAddress]
  },
})

