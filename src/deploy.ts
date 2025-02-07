import { Signer } from '@ethersproject/abstract-signer'
import { BigNumber } from '@ethersproject/bignumber'
import { migrate } from './migrate'
import { MigrationState, MigrationStep, StepOutput } from './migrations'
import { ADD_1BP_FEE_TIER } from './steps/3_add-1bp-fee-tier'
import { DEPLOY_MULTICALL2 } from './steps/9_deploy-multicall2'
import { DEPLOY_NFT_DESCRIPTOR_LIBRARY_V1_3_0 } from './steps/12_deploy-nft-descriptor-library-v1_3_0'
import { DEPLOY_NFT_POSITION_DESCRIPTOR_V1_3_0 } from './steps/13_deploy-nft-position-descriptor-v1_3_0'
import { DEPLOY_NONFUNGIBLE_POSITION_MANAGER } from './steps/15_deploy-nonfungible-position-manager'
import { DEPLOY_PROXY_ADMIN } from './steps/10_deploy-proxy-admin'
import { DEPLOY_QUOTER_V2 } from './steps/20_deploy-quoter-v2'
import { DEPLOY_TICK_LENS } from './steps/11_deploy-tick-lens'
import { DEPLOY_TRANSPARENT_PROXY_DESCRIPTOR } from './steps/14_deploy-transparent-proxy-descriptor'
import { DEPLOY_V3_CORE_FACTORY } from './steps/2_deploy-v3-core-factory'
import { DEPLOY_V3_MIGRATOR } from './steps/16_deploy-v3-migrator'
import { DEPLOY_V3_STAKER } from './steps/18_deploy-v3-staker'
import { DEPLOY_V3_SWAP_ROUTER_02 } from './steps/21_deploy-v3-swap-router-02'
import { TRANSFER_PROXY_ADMIN } from './steps/22_transfer-proxy-admin'
import { TRANSFER_V3_CORE_FACTORY_OWNER } from './steps/17_transfer-v3-core-factory-owner'
import { DEPLOY_NFT_TIMELOCK } from './steps/1_deploy-nft-timelock'
import { DEPLOY_V3_DEPLOYER } from './steps/7_deploy-v3-deployer'
import { DEPLOY_V2_FACTORY } from './steps/4_deploy-v2-factory'
import { DEPLOY_FEE_DETECTOR } from './steps/5_deploy-fee-detector'
import { DEPLOY_V2_ROUTER } from './steps/6_deploy-v2-router'
import { DEPLOY_QUOTER } from './steps/19_deploy-quoter'
import { DEPLOY_UNSUPPORTED_PROTOCOL } from './steps/8_deploy-unsupported-protocol'

const MIGRATION_STEPS: MigrationStep[] = [
  // must come first, for address calculations
  DEPLOY_NFT_TIMELOCK,
  DEPLOY_V3_CORE_FACTORY,
  ADD_1BP_FEE_TIER,
  DEPLOY_V2_FACTORY,
  DEPLOY_FEE_DETECTOR,
  DEPLOY_V2_ROUTER,
  DEPLOY_V3_DEPLOYER,
  DEPLOY_UNSUPPORTED_PROTOCOL,
  DEPLOY_MULTICALL2,
  DEPLOY_PROXY_ADMIN,
  DEPLOY_TICK_LENS,
  DEPLOY_NFT_DESCRIPTOR_LIBRARY_V1_3_0,
  DEPLOY_NFT_POSITION_DESCRIPTOR_V1_3_0,
  DEPLOY_TRANSPARENT_PROXY_DESCRIPTOR,
  DEPLOY_NONFUNGIBLE_POSITION_MANAGER,
  DEPLOY_V3_MIGRATOR,
  TRANSFER_V3_CORE_FACTORY_OWNER,
  DEPLOY_V3_STAKER,
  DEPLOY_QUOTER,
  DEPLOY_QUOTER_V2,
  DEPLOY_V3_SWAP_ROUTER_02,
  TRANSFER_PROXY_ADMIN,
]

export default function deploy({
  signer,
  gasPrice: numberGasPrice,
  initialState,
  onStateChange,
  weth9Address,
  nativeCurrencyLabelBytes,
  ownerAddress,
}: {
  signer: Signer
  gasPrice: number | undefined
  weth9Address: string
  nativeCurrencyLabelBytes: string
  ownerAddress: string
  initialState: MigrationState
  onStateChange: (newState: MigrationState) => Promise<void>
}): AsyncGenerator<StepOutput[], void, void> {
  const gasPrice =
    typeof numberGasPrice === 'number' ? BigNumber.from(numberGasPrice).mul(BigNumber.from(10).pow(9)) : undefined // convert to wei

  return migrate({
    steps: MIGRATION_STEPS,
    config: { gasPrice, signer, weth9Address, nativeCurrencyLabelBytes, ownerAddress },
    initialState,
    onStateChange,
  })
}
