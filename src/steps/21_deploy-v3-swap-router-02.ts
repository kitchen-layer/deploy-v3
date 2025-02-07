// import SwapRouter02 from '@uniswap/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json'
import CustomSwapRouter02 from '../artifacts/SwapRouter02.json'
import createDeployContractStep from './meta/createDeployContractStep'

const extendedArtifact = {
  ...CustomSwapRouter02,
  contractName: 'SwapRouter02',
  bytecode: CustomSwapRouter02.bytecode
}

export const DEPLOY_V3_SWAP_ROUTER_02 = createDeployContractStep({
  key: 'swapRouter02',
  artifact: extendedArtifact,
  computeArguments(state, config) {
    if (state.v3CoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NFT manager')
    }

    if (!state.v2FactoryAddress) {
      throw new Error('Missing V2 Factory')
    }

    return [
      state.v2FactoryAddress,
      state.v3CoreFactoryAddress,
      state.nonfungibleTokenPositionManagerAddress,
      config.weth9Address,
    ]
  },
})
