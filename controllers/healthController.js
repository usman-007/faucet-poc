const HealthService = require("../services/healthService");

class HealthController {
  static async getHealth(req, res) {
    try {
      const healthData = await HealthService.getBasicHealth();
      res.status(200).json(healthData);
    } catch (error) {
      res.status(500).json({ error: "Health check failed" });
    }
  }
}

module.exports = HealthController;
