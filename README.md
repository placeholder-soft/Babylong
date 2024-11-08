# Token Creation Platform

A decentralized token creation platform built with React + TypeScript + Vite.

## Overview

This is a decentralized platform that enables users to easily create and manage their own tokens on the blockchain, specifically designed for SAT Layer tokens. The platform provides comprehensive token management features including creation, trading, and listing.

### Key Features

- Token Management
  - View complete token list with real-time data
  - Create custom SAT Layer tokens
  - Trade tokens (Buy/Sell functionality)
  - Real-time price tracking

- Token Creation
  - Support for standard token creation
  - Customizable token parameters (name, symbol, total supply, etc.)
  - SAT Layer token deployment
  
- Trading Features
  - Direct token purchase
  - Token selling mechanism
  - Real-time price updates
  - Transaction history

- King Hill Feature
  - Special token interaction mechanism
  - Real-time status display
  - Token competition system

## Tech Stack

- React 18
- TypeScript
- Vite
- Web3.js/Ethers.js (for blockchain interactions)
- ESLint (code standards)

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 7
- MetaMask or compatible Web3 wallet

### Installation

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Smart Contracts

### SAT Layer Contracts
The platform integrates with the following SAT Layer smart contracts:

1. **Token Factory Contract**
   - Enables creation of new SAT Layer tokens
   - Handles token deployment and initialization
   - Manages token listing and visibility
   - Network: SAT Layer Testnet/Mainnet

2. **Trading Contract**
   - Handles token buying and selling
   - Manages price calculations
   - Provides liquidity mechanisms

3. **King Hill Game Contract**
   - Manages token competition mechanics
   - Implements ranking and reward distribution
   - Supports token staking and competition rules

### Contract Addresses
- Token Factory: `[Contract Address]`
- Trading Contract: `[Contract Address]`
- King Hill Game: `[Contract Address]`

### Network Configuration
- Network Name: SAT Layer
- RPC URL: `https://[network-url]`
- Chain ID: `[chain-id]`
- Currency Symbol: SAT

### Platform Features

#### Token List
- View all available tokens
- Real-time price and market cap information
- Trading volume statistics
- Token details and charts

#### Token Creation
1. Connect wallet
2. Fill in token details:
   - Token name
   - Symbol
   - Initial supply
   - Other parameters
3. Deploy token to SAT Layer

#### Trading
1. **Buying Tokens**
   - Select token from list
   - Enter purchase amount
   - Confirm transaction
   - View transaction status

2. **Selling Tokens**
   - Choose token to sell
   - Enter sale amount
   - Confirm transaction
   - Track sale status

### Interacting with Contracts
1. Connect your wallet to SAT Layer network
2. Ensure sufficient SAT for gas fees
3. Follow the UI prompts for token creation and trading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)

## Contact

For any questions or suggestions, please open an Issue or Pull Request.
