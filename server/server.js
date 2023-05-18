const dotenv = require("dotenv").config();
const express = require("express");
const dataRoutes = require("./routes/dataRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
connectDB();
const app = express();
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("HEllo world!");
// });
app.use("/api/data", dataRoutes);

const __dirname1 = path.resolve();
if (process.env.MODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running successfully");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server is running at port ${PORT}`)
);
