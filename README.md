# Express API with MVC Architecture

A Node.js Express API built using MVC (Model-View-Controller) architecture with health check endpoints and a complete faucet service for EVM-based chains.

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── config/               # Configuration files
│   ├── config.js
│   └── env.example
├── routes/               # Route definitions
│   ├── healthRoutes.js
│   └── faucetRoutes.js
├── controllers/          # Business logic
│   ├── healthController.js
│   └── faucetController.js
├── services/            # Data processing
│   ├── healthService.js
│   └── faucetService.js
└── models/              # Data models
    ├── Health.js
    └── FaucetRequest.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp config/env.example .env
# Edit .env with your chain configuration
```

3. Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check

- `GET /` - Welcome message
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed health check with system info

### Faucet Service

- `POST /api/faucet/request` - Request tokens from faucet
- `GET /api/faucet/info` - Get faucet information and balance
- `GET /api/faucet/transaction/:txHash` - Get transaction status

## Faucet API Usage

### Request Tokens

```bash
curl -X POST http://localhost:3000/api/faucet/request \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x1234567890123456789012345678901234567890",
    "tokenAmount": "1.5"
  }'
```

Response:

```json
{
  "success": true,
  "message": "Tokens sent successfully",
  "data": {
    "txHash": "0x...",
    "recipient": "0x1234567890123456789012345678901234567890",
    "amount": "1.5",
    "blockNumber": 12345,
    "gasUsed": "21000"
  }
}
```

### Get Faucet Info

```bash
curl http://localhost:3000/api/faucet/info
```

### Get Transaction Status

```bash
curl http://localhost:3000/api/faucet/transaction/0x...
```

## Environment Variables

Create a `.env` file with:

```env
# Chain Configuration
CHAIN_RPC_URL=http://localhost:9944
CHAIN_ID=1337

# Faucet Configuration
FAUCET_PRIVATE_KEY=your_faucet_private_key_here
FAUCET_ADDRESS=your_faucet_address_here
TOKENS_PER_REQUEST=1000000000000000000
MAX_TOKENS_PER_REQUEST=10000000000000000000

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Architecture

- **Models**: Data structures and validation (`FaucetRequest.js`, `Health.js`)
- **Views**: JSON response formatting (API responses)
- **Controllers**: Handle HTTP requests and responses (`faucetController.js`, `healthController.js`)
- **Services**: Business logic and data processing (`faucetService.js`, `healthService.js`)
- **Routes**: URL endpoint definitions (`faucetRoutes.js`, `healthRoutes.js`)

## Docker Deployment

1. Build and run with Docker Compose:

```bash
docker-compose up -d
```

2. Set environment variables in your shell or `.env` file:

```bash
export FAUCET_PRIVATE_KEY=your_private_key
export FAUCET_ADDRESS=your_faucet_address
```

## Features

- ✅ MVC Architecture
- ✅ EVM Chain Integration
- ✅ Token Dispensing
- ✅ Transaction Status Tracking
- ✅ Input Validation
- ✅ Error Handling
- ✅ Docker Support
- ✅ Health Checks
- ✅ Environment Configuration
