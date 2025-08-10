const express = require("express");
const router = express.Router();
const HealthController = require("../controllers/healthController");

// Health check routes
router.get("/", HealthController.getHealth); // works 

module.exports = router;
