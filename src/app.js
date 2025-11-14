const express = require("express");
const cors = require("cors");

const authorRoutes = require("./routes/author.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/author", authorRoutes);

app.get("/", (req, res) => {
  res.send("SINTA Scraper API is running");
});

module.exports = app;
