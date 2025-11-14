const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routing utama
app.use("/", routes);

// Root check endpoint
app.get("/", (req, res) => {
  res.send("SINTA Scraper API is running");
});

module.exports = app;
