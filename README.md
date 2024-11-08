# Token Creation Platform

A decentralized token creation platform built on Babylon Testnet using React + TypeScript + Vite.

## Overview

This is a decentralized platform specifically designed for the Babylon Testnet that enables users to easily create and manage their own tokens, including creation, trading, and listing management features.

### Core Features

- Token Management
  - View real-time token listings
  - Create custom tokens
  - Token trading functionality
  - Real-time price tracking

- King Hill Feature
  - Special token interaction mechanism
  - Real-time status display
  - Token competition system

## Tech Stack

- React 18
- TypeScript
- Vite
- CosmJS (for blockchain interactions)
- ESLint (code standards)

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 7
- Keplr Wallet

### Installation

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

## Network Configuration

### Babylon Testnet Information

- Network Name: satlayer-babylon-testnet
- Chain ID: sat-bbn-testnet1
- RPC Node: https://rpc.sat-bbn-testnet1.satlayer.net
- REST API: https://lcd1.sat-bbn-testnet1.satlayer.net
- Explorer: https://devnet.satlayer.xyz/satlayer-babylon-testnet

### Token Information

- Token Name: BBN
- Minimal Denomination: ubbn
- Decimals: 6
- Gas Price Configuration:
  - Low: 0.01
  - Average: 0.025
  - High: 0.03

## Features

### Token List
- View all available tokens
- Real-time price information
- Trading volume statistics
- Token details

### Token Creation Process
1. Connect Keplr wallet
2. Fill in token details:
   - Token name
   - Symbol
   - Initial supply
   - Other parameters
3. Deploy to Babylon Testnet

### Trading Features
- Token purchase
- Token selling
- Transaction status tracking

## Development Guide

### Network Connection
1. Ensure Keplr wallet is installed
2. Connect to Babylon Testnet
3. Ensure sufficient BBN tokens for gas fees

### Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Submit a Pull Request

## License

[MIT License](LICENSE)

## Contact

For any questions or suggestions, please submit an Issue or Pull Request.
