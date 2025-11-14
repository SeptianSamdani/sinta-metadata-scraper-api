const authorService = require("../services/author.service");

// ---------------------------------------
// POST /author/scrape
// ---------------------------------------
async function scrapeAndSaveAuthor(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Author ID is required" });
    }

    const result = await authorService.scrapeAndSaveAuthor(id);

    res.status(200).json({
      message: "Author scraped and saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error scraping author:", error);
    res.status(500).json({ error: "Failed to scrape author" });
  }
}

// ---------------------------------------
// GET /author/:id
// ---------------------------------------
async function getAuthor(req, res) {
  try {
    const { id } = req.params;
    const author = await authorService.getAuthor(id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ error: "Failed to fetch author" });
  }
}

// ---------------------------------------
// GET /author/:id/publications
// ---------------------------------------
async function getPublications(req, res) {
  try {
    const { id } = req.params;
    const publications = await authorService.getPublications(id);

    res.json(publications);
  } catch (error) {
    console.error("Error fetching publications:", error);
    res.status(500).json({ error: "Failed to fetch publications" });
  }
}

// ---------------------------------------
// GET /author/:id/stats/yearly
// ---------------------------------------
async function getYearlyStats(req, res) {
  try {
    const { id } = req.params;
    const stats = await authorService.getYearlyStats(id);

    res.json(stats);
  } catch (error) {
    console.error("Error generating stats:", error);
    res.status(500).json({ error: "Failed to generate stats" });
  }
}

module.exports = {
  scrapeAndSaveAuthor,
  getAuthor,
  getPublications,
  getYearlyStats,
};
