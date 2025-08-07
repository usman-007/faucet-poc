const express = require("express");
const router = express.Router();
const HealthController = require("../controllers/healthController");

// Health check routes
router.get("/", HealthController.getHealth);
router.get("/detailed", HealthController.getDetailedHealth);

module.exports = router;
