const sintaScraper = require("./sintaScraper");
const authorRepo = require("../repositories/author.repository");
const publicationRepo = require("../repositories/publication.repository");

// ---------------------------------------------------------------------
// SCRAPE + SAVE AUTHOR
// ---------------------------------------------------------------------
async function scrapeAndSaveAuthor(authorId) {
  // scrape HTML SINTA
  const scraped = await sintaScraper.scrapeAuthorProfile(authorId);

  // simpan/update author
  await authorRepo.upsertAuthor({
    id: scraped.id,
    name: scraped.name,
    affiliation: scraped.affiliation,
    sinta_url: scraped.sinta_url,
  });

  // delete old publications
  await publicationRepo.deletePublicationsByAuthor(authorId);

  // insert new publications
  for (const pub of scraped.publications) {
    await publicationRepo.insertPublication(authorId, pub);
  }

  return {
    author: {
      id: scraped.id,
      name: scraped.name,
      affiliation: scraped.affiliation,
      sinta_url: scraped.sinta_url,
    },
    publications_saved: scraped.publications.length,
  };
}

// ---------------------------------------------------------------------
// GET AUTHOR FROM DB
// ---------------------------------------------------------------------
async function getAuthor(id) {
  return await authorRepo.getAuthorById(id);
}

// ---------------------------------------------------------------------
// GET PUBLICATIONS FROM DB
// ---------------------------------------------------------------------
async function getPublications(authorId) {
  return await publicationRepo.getPublications(authorId);
}

// ---------------------------------------------------------------------
// YEARLY STATS
// ---------------------------------------------------------------------
async function getYearlyStats(authorId) {
  const publications = await publicationRepo.getPublications(authorId);

  const stats = {};

  publications.forEach((pub) => {
    const y = pub.year || "Unknown";

    if (!stats[y]) stats[y] = 0;
    stats[y]++;
  });

  return Object.entries(stats)
    .map(([year, count]) => ({
      year: isNaN(parseInt(year)) ? "Unknown" : parseInt(year),
      count,
    }))
    .sort((a, b) => b.year - a.year);
}

module.exports = {
  scrapeAndSaveAuthor,
  getAuthor,
  getPublications,
  getYearlyStats,
};
