const { ethers } = require("ethers");
const config = require("../config/config");

class FaucetService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(config.chain.rpcUrl);
    this.wallet = new ethers.Wallet(config.faucet.privateKey, this.provider);
    this.defaultAmount = config.faucet.tokensPerRequest;
    this.maxAmount = config.faucet.maxTokensPerRequest;
  }

  async getFaucetBalance() {
    try {
      const balance = await this.provider.getBalance(config.faucet.address);
      return ethers.formatEther(balance);
    } catch (error) {
      throw new Error(`Failed to get faucet balance: ${error.message}`);
    }
  }

  async sendTokens(walletAddress, tokenAmount) {
    try {
      // Validate inputs
      if (!ethers.isAddress(walletAddress)) {
        throw new Error("Invalid wallet address");
      }

      // Parse token amount (assuming 18 decimals)
      const amountWei = ethers.parseUnits(tokenAmount.toString(), 18);

      // Check if amount exceeds maximum
      if (amountWei > ethers.parseUnits(this.maxAmount, 18)) {
        throw new Error(
          `Amount exceeds maximum allowed: ${this.maxAmount} tokens`
        );
      }

      // Check faucet balance
      const faucetBalance = await this.provider.getBalance(
        config.faucet.address
      );
      if (faucetBalance < amountWei) {
        throw new Error("Insufficient faucet balance");
      }

      // Prepare transaction
      const tx = {
        to: walletAddress,
        value: amountWei,
        gasLimit: 21000, // Standard ETH transfer gas limit
      };

      // Estimate gas (optional, for better gas estimation)
      try {
        const estimatedGas = await this.provider.estimateGas(tx);
        tx.gasLimit = estimatedGas;
      } catch (error) {
        console.log("Using default gas limit for transaction");
      }

      // Send transaction
      const transaction = await this.wallet.sendTransaction(tx);

      // Wait for transaction to be mined
      const receipt = await transaction.wait();

      return {
        success: true,
        txHash: transaction.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        amount: tokenAmount,
        recipient: walletAddress,
      };
    } catch (error) {
      throw new Error(`Failed to send tokens: ${error.message}`);
    }
  }

  async getTransactionStatus(txHash) {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);

      if (!receipt) {
        return { status: "pending" };
      }

      return {
        status: receipt.status === 1 ? "success" : "failed",
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        confirmations: receipt.confirmations,
      };
    } catch (error) {
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }

  async getChainInfo() {
    try {
      const network = await this.provider.getNetwork();
      const latestBlock = await this.provider.getBlockNumber();

      return {
        chainId: network.chainId,
        name: network.name,
        latestBlock,
        faucetAddress: config.faucet.address,
        defaultAmount: ethers.formatEther(this.defaultAmount),
        maxAmount: ethers.formatEther(this.maxAmount),
      };
    } catch (error) {
      throw new Error(`Failed to get chain info: ${error.message}`);
    }
  }
}

module.exports = FaucetService;
