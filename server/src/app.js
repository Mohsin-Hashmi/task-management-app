const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db-connection");
const usersRoutes = require('./routes/user');
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**Routes */
app.use("/api/auth", usersRoutes);

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
