const JournalRepo = require("../repositories/journal.repository");
const { scrapeJournal } = require("../services/sintaJournalScraper");

async function scrapeAndSaveJournal(req, res) {
  try {
    const { id } = req.body;
    const data = await scrapeJournal(id);

    await JournalRepo.upsertJournal(data);

    res.json({
      message: "Journal scraped and saved successfully",
      data
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to scrape journal" });
  }
}

async function getJournal(req, res) {
  try {
    const { id } = req.params;
    const journal = await JournalRepo.getJournalById(id);

    if (!journal) return res.status(404).json({ error: "Journal not found" });

    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving journal" });
  }
}

module.exports = {
  scrapeAndSaveJournal,
  getJournal
};
