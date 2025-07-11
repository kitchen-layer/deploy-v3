import fs from 'node:fs'
import { execSync } from 'node:child_process'

const artifacts = [
  {
    source: '../v3/kitchen-dex-periphery/out/NonfungiblePositionManager.sol/NonfungiblePositionManager.json',
    dest: './src/artifacts/NonfungiblePositionManager.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/Quoter.sol/Quoter.json',
    dest: './src/artifacts/Quoter.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/TickLens.sol/TickLens.json',
    dest: './src/artifacts/TickLens.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/NFTDescriptor.sol/NFTDescriptor.json',
    dest: './src/artifacts/NFTDescriptor.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json',
    dest: './src/artifacts/NonfungibleTokenPositionDescriptor.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/V3Migrator.sol/V3Migrator.json',
    dest: './src/artifacts/V3Migrator.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/nftTimelock.sol/SimpleNFTTimelock.json',
    dest: './src/artifacts/SimpleNFTTimelock.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/UniswapV3Factory.sol/UniswapV3Factory.json',
    dest: './src/artifacts/UniswapV3Factory.json'
  },
  {
    source: '../v3/kitchen-dex-periphery/out/UniswapV3PoolDeployer.sol/UniswapV3PoolDeployer.json',
    dest: './src/artifacts/UniswapV3PoolDeployer.json'
  },
  {
    source: '../v2/kitchen-v2-periphery/out/UniswapV2Factory.sol/UniswapV2Factory.json',
    dest: './src/artifacts/UniswapV2Factory.json'
  },
  {
    source: '../v2/kitchen-v2-periphery/out/UniswapV2Router02.sol/UniswapV2Router02.json',
    dest: './src/artifacts/UniswapV2Router02.json'
  },
  {
    source: '../kitchen-universal-router/out/UnsupportedProtocol.sol/UnsupportedProtocol.json',
    dest: './src/artifacts/Unsupported.json'
  },
  {
    source: '../kitchen-swap-router-contracts/out/QuoterV2.sol/QuoterV2.json',
    dest: './src/artifacts/QuoterV2.json'
  },
  {
    source: '../kitchen-swap-router-contracts/out/SwapRouter02.sol/SwapRouter02.json',
    dest: './src/artifacts/SwapRouter02.json'
  },
  {
    source: '../kitchen-swap-router-contracts/out/MixedRouteQuoterV1.sol/MixedRouteQuoterV1.json',
    dest: './src/artifacts/MixedRouteQuoterV1.json'
  },
  {
    source: '../v3/v3-staker/artifacts/contracts/UniswapV3Staker.sol/UniswapV3Staker.json',
    dest: './src/artifacts/UniswapV3Staker.json'
  }
]

// Ensure artifacts directory exists
if (!fs.existsSync('./src/artifacts')) {
  fs.mkdirSync('./src/artifacts', { recursive: true })
}

// Build all repos first
console.log('Building v3-staker...')
execSync('cd ../v3/v3-staker', { stdio: 'inherit' })
console.log('Building kitchen-dex-periphery...')
execSync('cd ../v3/kitchen-dex-periphery && forge build --via-ir', { stdio: 'inherit' })
console.log('Building kitchen-swap-router-contracts...')
execSync('cd ../kitchen-swap-router-contracts && forge build --via-ir --optimize --no-metadata', { stdio: 'inherit' })
console.log('Building kitchen-v2-periphery...')
execSync('cd ../v2/kitchen-v2-periphery && forge build', { stdio: 'inherit' })

// Copy artifacts
console.log('Copying artifacts...')
for (const { source, dest } of artifacts) {
  console.log(`Copying ${source} to ${dest}`)
  fs.copyFileSync(source, dest)
}

console.log('Done!') 