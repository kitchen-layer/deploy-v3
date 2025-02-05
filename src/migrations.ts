import { Signer } from '@ethersproject/abstract-signer'
import { BigNumber } from '@ethersproject/bignumber'
import { GenericMigrationStep } from './migrate'

export interface MigrationState {
  readonly v3CoreFactoryAddress?: string
  readonly swapRouter02?: string
  readonly nftDescriptorLibraryAddressV1_3_0?: string
  readonly nonfungibleTokenPositionDescriptorAddressV1_3_0?: string
  readonly descriptorProxyAddress?: string
  readonly multicall2Address?: string
  readonly proxyAdminAddress?: string
  readonly quoterAddress?: string
  readonly quoterV2Address?: string
  readonly unsupportedProtocolAddress?: string
  readonly v2FactoryAddress?: string
  readonly v2RouterAddress?: string
  readonly tickLensAddress?: string
  readonly feeDetectorAddress?: string
  readonly v3MigratorAddress?: string
  readonly v3StakerAddress?: string
  readonly nftTimelockAddress?: string
  readonly nonfungibleTokenPositionManagerAddress?: string
  readonly v3DeployerAddress?: string
}

export type StepOutput = { message: string; hash?: string; address?: string }

export type MigrationConfig = {
  signer: Signer
  gasPrice: BigNumber | undefined
  weth9Address: string
  nativeCurrencyLabelBytes: string
  ownerAddress: string
}

export type MigrationStep = GenericMigrationStep<MigrationState, MigrationConfig, StepOutput[]>
