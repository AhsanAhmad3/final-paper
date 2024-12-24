const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection using the MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/tasks", require("./routes/taskRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
