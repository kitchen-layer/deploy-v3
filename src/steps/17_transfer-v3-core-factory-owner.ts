import CustomUniswapV3Factory from '../artifacts/UniswapV3Factory.json'
import { Contract } from '@ethersproject/contracts'
import type { MigrationStep } from '../migrations'

const extendedArtifact = {
  ...CustomUniswapV3Factory,
  contractName: 'UniswapV3Factory',
  bytecode: CustomUniswapV3Factory.bytecode
}

export const TRANSFER_V3_CORE_FACTORY_OWNER: MigrationStep = async (state, { signer, gasPrice, ownerAddress }) => {
  if (state.v3CoreFactoryAddress === undefined) {
    throw new Error('Missing UniswapV3Factory')
  }

  const v3CoreFactory = new Contract(state.v3CoreFactoryAddress, extendedArtifact.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner === ownerAddress)
    return [
      {
        message: `UniswapV3Factory owned by ${ownerAddress} already`,
      },
    ]

  if (owner !== (await signer.getAddress())) {
    throw new Error('UniswapV3Factory.owner is not signer')
  }

  const tx = await v3CoreFactory.setOwner(ownerAddress, { gasPrice })

  return [
    {
      message: `UniswapV3Factory ownership set to ${ownerAddress}`,
      hash: tx.hash,
    },
  ]
}
