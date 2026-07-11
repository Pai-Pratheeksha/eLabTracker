const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("./config/config");
const { notFound, errorMiddleware } = require("./middleware/errorMiddleware");

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

app.use(notFound);
app.use(errorMiddleware);

// Start server after DB connection
connectDB().then(() => {
  app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
});
