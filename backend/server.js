const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

const labRoutes = require('./routes/lab');
app.use('/api/labs', labRoutes);

const experimentRoutes = require('./routes/experiment');
app.use('/api/experiments', experimentRoutes);

const submissionRoutes = require('./routes/submission');
app.use('/api/submissions', submissionRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
