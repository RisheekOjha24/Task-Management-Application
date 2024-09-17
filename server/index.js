const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const authRoutes = require("./routes/authRoutes");
const listRoutes = require("./routes/listRoutes");
const taskRoutes = require("./routes/taskRoutes");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connectiong the Database
dbConnect();

app.use("/auth", authRoutes);
app.use("/list",listRoutes);
app.use("/task",taskRoutes);

app.get("/", (req, res) => {
    console.log("APi hit");
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


