const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db-connection");
const cookieParser = require("cookie-parser");
const usersRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const adminRoutes = require("./routes/admin");
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**Routes */
app.use("/api/auth", usersRoutes);
app.use("/api", taskRoutes);
app.use("/api", adminRoutes);
/**Connecting Database */
connectDB()
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
  });
/**Listeing Application */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
