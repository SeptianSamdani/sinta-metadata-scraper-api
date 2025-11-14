const express = require("express");
const router = express.Router();

const journalController = require("../controllers/journal.controller");

// POST → Scrape dan simpan data jurnal berdasarkan ID SINTA
router.post("/scrape", journalController.scrapeAndSaveJournal);

// GET → Ambil data jurnal yang sudah tersimpan di database
router.get("/:id", journalController.getJournal);

module.exports = router;
