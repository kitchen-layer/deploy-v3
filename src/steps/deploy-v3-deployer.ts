import createDeployContractStep from './meta/createDeployContractStep'
import UniswapV3Deployer from '../artifacts/UniswapV3Deployer.json'

const extendedArtifact = {
  ...UniswapV3Deployer,
  contractName: 'UniswapV3Deployer',
  bytecode: UniswapV3Deployer.bytecode.object,
}

export const DEPLOY_V3_DEPLOYER = createDeployContractStep({
  key: 'v3DeployerAddress',
  artifact: extendedArtifact
})
