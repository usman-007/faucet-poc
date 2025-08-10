const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes
const healthRoutes = require("./routes/healthRoutes");
const faucetRoutes = require("./routes/faucetRoutes");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/v1/faucet", faucetRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API", version: "1.0.0" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`Faucet API available at: http://localhost:${PORT}/api/v1/faucet`);
});

module.exports = app;
