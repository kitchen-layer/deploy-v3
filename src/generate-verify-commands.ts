import fs from 'node:fs'
import path from 'node:path'

const state = JSON.parse(fs.readFileSync('./state.json', 'utf8'))

// Hardcoded config values that were used during deployment
const config = {
  weth9Address: '0x4200000000000000000000000000000000000006',
  ownerAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
}

const commands = [
  {
    cd: '../kitchen-dex-core/',
    contracts: [
      {
        name: 'UniswapV3Factory',
        address: state.v3CoreFactoryAddress,
        path: './src/UniswapV3Factory.sol:UniswapV3Factory',
        args: [],
      },
      {
        name: 'UniswapV3PoolDeployer',
        address: state.v3DeployerAddress,
        path: './src/UniswapV3PoolDeployer.sol:UniswapV3PoolDeployer',
        args: [],
      }
    ],
  },
  {
    cd: '../kitchen-v2-periphery/',
    contracts: [
      {
        name: 'UniswapV2Factory',
        address: state.v2FactoryAddress,
        path: './src/UniswapV2Factory.sol:UniswapV2Factory',
        args: [config.ownerAddress],
      },
      {
        name: 'UniswapV2Router02',
        address: state.v2RouterAddress,
        path: './src/UniswapV2Router02.sol:UniswapV2Router02',
        args: [state.v2FactoryAddress, config.weth9Address],
      }
    ],
  },
  {
    cd: '../kitchen-dex-periphery/',
    contracts: [
      {
        name: 'NonfungiblePositionManager',
        address: state.nonfungibleTokenPositionManagerAddress,
        path: './src/NonfungiblePositionManager.sol:NonfungiblePositionManager',
        args: [state.v3CoreFactoryAddress, config.weth9Address, state.descriptorProxyAddress, state.nftTimelockAddress],
      },
      {
        name: 'Quoter',
        address: state.quoterAddress,
        path: './src/Quoter.sol:Quoter',
        args: [state.v3CoreFactoryAddress, config.weth9Address],
      },
      {
        name: 'TickLens',
        address: state.tickLensAddress,
        path: './src/lens/TickLens.sol:TickLens',
        args: [],
      },
      {
        name: 'NFTDescriptor',
        address: state.nftDescriptorLibraryAddressV1_3_0,
        path: './src/libraries/NFTDescriptor.sol:NFTDescriptor',
        args: [],
      },
      {
        name: 'NonfungibleTokenPositionDescriptor',
        address: state.nonfungibleTokenPositionDescriptorAddressV1_3_0,
        path: './src/NonfungibleTokenPositionDescriptor.sol:NonfungibleTokenPositionDescriptor',
        args: [config.weth9Address],
      },
      {
        name: 'V3Migrator',
        address: state.v3MigratorAddress,
        path: './src/V3Migrator.sol:V3Migrator',
        args: [state.v3CoreFactoryAddress, config.weth9Address, state.nonfungibleTokenPositionManagerAddress],
      },
      {
        name: 'SimpleNFTTimelock',
        address: state.nftTimelockAddress,
        path: './src/nftTimelock.sol:SimpleNFTTimelock',
        args: [],
      }
    ],
  },
  {
    cd: '../kitchen-swap-router-contracts/',
    contracts: [
      {
        name: 'QuoterV2',
        address: state.quoterV2Address,
        path: './src/QuoterV2.sol:QuoterV2',
        args: [state.v3CoreFactoryAddress, config.weth9Address],
      },
      {
        name: 'SwapRouter02',
        address: state.swapRouter02,
        path: './src/SwapRouter02.sol:SwapRouter02',
        args: [state.v3CoreFactoryAddress, state.v2FactoryAddress, config.weth9Address],
      },
      {
        name: 'MixedRouteQuoterV1',
        address: state.mixedRouteQuoterV1Address,
        path: './src/MixedRouteQuoterV1.sol:MixedRouteQuoterV1',
        args: [state.v3CoreFactoryAddress, state.v2FactoryAddress, config.weth9Address],
      }
    ],
  },
  {
    cd: '../v3-staker/',
    contracts: [
      {
        name: 'UniswapV3Staker',
        address: state.v3StakerAddress,
        path: './src/UniswapV3Staker.sol:UniswapV3Staker',
        args: [state.v3CoreFactoryAddress, state.nonfungibleTokenPositionManagerAddress, config.ownerAddress],
      }
    ],
  }
]

// Generate verification commands
for (const { cd, contracts } of commands) {
  console.log(`# Verifying contracts in ${cd}`)
  for (const { name, address, path, args } of contracts) {
    const argsString = args.length > 0 ? `--constructor-args "${args.join(',')}"` : ''
    console.log(`cd ${cd} && forge verify-contract ${argsString} ${address} ${path} --verifier-url=https://explorer.kitchen-layer.com/api/ --verifier blockscout --watch && cd ../deploy-v3`)
  }
  console.log('')
} 