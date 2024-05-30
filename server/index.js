const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const departmentRoutes = require("./routes/departmentRoute");
const userRoutes = require("./routes/userRoute");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/department", departmentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Department Management System!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
