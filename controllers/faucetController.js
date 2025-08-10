const FaucetService = require("../services/faucetService");
const FaucetRequest = require("../models/FaucetRequest");
const config = require("../config/config"); // Add this import
const { ethers } = require("ethers"); 

class FaucetController {
  static async requestTokens(req, res) {
    try {
      const { walletAddress, tokenAmount } = req.body;

      // Create and validate request model
      const faucetRequest = FaucetRequest.create({
        walletAddress,
        tokenAmount:
          tokenAmount || ethers.formatEther(config.faucet.tokensPerRequest),
      });

      const validation = faucetRequest.validate();
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors,
        });
      }

      // Send tokens using service
      const faucetService = new FaucetService();
      const result = await faucetService.sendTokens(walletAddress, tokenAmount);

      res.status(200).json({
        success: true,
        message: "Tokens sent successfully",
        data: {
          txHash: result.txHash,
          recipient: result.recipient,
          amount: result.amount,
          blockNumber: result.blockNumber,
          gasUsed: result.gasUsed,
        },
      });
    } catch (error) {
      console.error("Faucet request error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getFaucetInfo(req, res) {
    try {
      const faucetService = new FaucetService();

      const [balance, chainInfo] = await Promise.all([
        faucetService.getFaucetBalance(),
        faucetService.getChainInfo(),
      ]);

      console.log("Faucet info", balance, chainInfo);

      res.status(200).json({
        success: true,
        data: {
          balance,
          chainInfo,
        },
      });
    } catch (error) {
      console.error("Get faucet info error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getTransactionStatus(req, res) {
    try {
      const { txHash } = req.params;

      if (!txHash) {
        return res.status(400).json({
          success: false,
          error: "Transaction hash is required",
        });
      }

      const faucetService = new FaucetService();
      const status = await faucetService.getTransactionStatus(txHash);

      res.status(200).json({
        success: true,
        data: status,
      });
    } catch (error) {
      console.error("Get transaction status error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = FaucetController;
