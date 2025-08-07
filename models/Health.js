class Health {
  constructor(data = {}) {
    this.status = data.status || "unknown";
    this.timestamp = data.timestamp || new Date().toISOString();
    this.uptime = data.uptime || 0;
    this.environment = data.environment || "development";
  }

  toJSON() {
    return {
      status: this.status,
      timestamp: this.timestamp,
      uptime: this.uptime,
      environment: this.environment,
    };
  }

  static create(data) {
    return new Health(data);
  }
}

module.exports = Health;
