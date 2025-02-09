// cp ../kitchen-dex-periphery/out/TickLens.sol/TickLens.json ./src/artifacts
import CustomTickLens from '../artifacts/TickLens.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomTickLens,
  contractName: 'TickLens',
  bytecode: CustomTickLens.bytecode.object
}

export const DEPLOY_TICK_LENS = createDeployContractStep({
  key: 'tickLensAddress',
  artifact: extendedArtifact,
})
