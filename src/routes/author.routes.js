const express = require("express");
const router = express.Router();

const authorController = require("../controllers/author.controller");

// POST → Scrape dan simpan data author + publikasi
router.post("/scrape", authorController.scrapeAndSaveAuthor);

// GET → Ambil data author dari database
router.get("/:id", authorController.getAuthor);

// GET → Ambil list publikasi author dari database
router.get("/:id/publications", authorController.getPublications);

// GET → Statistik publikasi per tahun
router.get("/:id/stats/yearly", authorController.getYearlyStats);

module.exports = router;
