import fs from 'node:fs'

const state = JSON.parse(fs.readFileSync('./state.json', 'utf8'))

// Mapping from state keys to environment variable names
const envMapping = {
  v3CoreFactoryAddress: 'REACT_APP_UNISWAP_V3_FACTORY',
  v2FactoryAddress: 'REACT_APP_UNISWAP_V2_FACTORY',
  v2RouterAddress: 'REACT_APP_UNISWAP_V2_ROUTER',
  quoterAddress: 'REACT_APP_QUOTER',
  quoterV2Address: 'REACT_APP_QUOTER_V2',
  v3MigratorAddress: 'REACT_APP_V3_MIGRATOR',
  nonfungibleTokenPositionManagerAddress: 'REACT_APP_POSITIONS_MANAGER',
  multicall2Address: 'REACT_APP_MULTICALL',
  tickLensAddress: 'REACT_APP_TICK_LENS',
  nftTimelockAddress: 'REACT_APP_TIMELOCK',
  swapRouter02: 'REACT_APP_SWAP_ROUTER_02',
  feeDetectorAddress: 'REACT_APP_V2_FEE_DETECTOR',
  mixedRouteQuoterV1Address: 'REACT_APP_MIXED_ROUTE_QUOTER_V1',
}

// Generate environment variables
for (const [stateKey, envName] of Object.entries(envMapping)) {
  if (state[stateKey]) {
    console.log(`${envName}="${state[stateKey]}"`)
  }
} 