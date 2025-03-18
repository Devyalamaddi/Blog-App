const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.log("❌ Error in connection:", err.message));

// Serve React Frontend (after build)
const frontendPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendPath));

// API Routes
const authorApp = require("./APIs/author-api");
const adminApp = require("./APIs/admin-api");
const userApp = require("./APIs/user-api");

app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

// Handle React Frontend Routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
