const express = require("express");
const router = express.Router();
const FaucetController = require("../controllers/faucetController");

// Request tokens from faucet
router.post("/request", FaucetController.requestTokens);

// Get faucet information (balance, chain info)
router.get("/info", FaucetController.getFaucetInfo);

// Get transaction status by hash
router.get("/transaction/:txHash", FaucetController.getTransactionStatus);

module.exports = router;
