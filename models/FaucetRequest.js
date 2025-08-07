const { ethers } = require("ethers");

class FaucetRequest {
  constructor(data = {}) {
    this.walletAddress = data.walletAddress || "";
    this.tokenAmount = data.tokenAmount || "0";
    this.timestamp = data.timestamp || new Date().toISOString();
    this.status = data.status || "pending";
    this.txHash = data.txHash || null;
    this.error = data.error || null;
  }

  validate() {
    const errors = [];

    // Validate wallet address
    if (!this.walletAddress) {
      errors.push("Wallet address is required");
    } else if (!ethers.isAddress(this.walletAddress)) {
      errors.push("Invalid wallet address format");
    }

    // Validate token amount
    if (!this.tokenAmount) {
      errors.push("Token amount is required");
    } else {
      try {
        const amount = ethers.parseUnits(this.tokenAmount.toString(), 18);
        if (amount <= 0) {
          errors.push("Token amount must be greater than 0");
        }
      } catch (error) {
        errors.push("Invalid token amount format");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toJSON() {
    return {
      walletAddress: this.walletAddress,
      tokenAmount: this.tokenAmount,
      timestamp: this.timestamp,
      status: this.status,
      txHash: this.txHash,
      error: this.error,
    };
  }

  static create(data) {
    return new FaucetRequest(data);
  }
}

module.exports = FaucetRequest;
