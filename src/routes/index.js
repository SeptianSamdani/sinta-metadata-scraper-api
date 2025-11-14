const express = require("express");
const router = express.Router();

const authorRoutes = require("./authorRoutes");
const journalRoutes = require("./journalRoutes");

router.use("/author", authorRoutes);
router.use("/journal", journalRoutes);

module.exports = router;
