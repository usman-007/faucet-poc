require("dotenv").config();

const config = {
  chain: {
    rpcUrl: process.env.CHAIN_RPC_URL || "http://localhost:9944",
    chainId: parseInt(process.env.CHAIN_ID) || 1337,
  },
  faucet: {
    privateKey: process.env.FAUCET_PRIVATE_KEY,
    address: process.env.FAUCET_ADDRESS,
    tokensPerRequest: process.env.TOKENS_PER_REQUEST || "1000000000000000000",
    maxTokensPerRequest:
      process.env.MAX_TOKENS_PER_REQUEST || "10000000000000000000",
  },
  server: {
    port: process.env.PORT || 3001,
    environment: process.env.NODE_ENV || "development",
  },
};

// Validate required environment variables
if (!config.faucet.privateKey) {
  throw new Error("FAUCET_PRIVATE_KEY is required");
}

if (!config.faucet.address) {
  throw new Error("FAUCET_ADDRESS is required");
}

module.exports = config;
