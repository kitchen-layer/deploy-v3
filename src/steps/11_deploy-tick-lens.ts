// import TickLens from '@uniswap/v3-periphery/artifacts/contracts/lens/TickLens.sol/TickLens.json'
import CustomTickLens from '../artifacts/TickLens.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomTickLens,
  contractName: 'TickLens',
  bytecode: CustomTickLens.bytecode
}

export const DEPLOY_TICK_LENS = createDeployContractStep({
  key: 'tickLensAddress',
  artifact: extendedArtifact,
})
