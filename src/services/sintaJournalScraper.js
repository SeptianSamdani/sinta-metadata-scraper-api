const axios = require("axios");
const cheerio = require("cheerio");
const randomUserAgent = require("../utils/randomUserAgent");

async function scrapeJournal(journalId) {
  const url = `https://sinta.kemdikbud.go.id/journals/profile/${journalId}`;

  const response = await axios.get(url, {
    headers: { "User-Agent": randomUserAgent() }
  });

  const $ = cheerio.load(response.data);

  const name = $("h3").first().text().trim();
  const publisher = $("h5").first().text().trim();

  const issn = $("td")
    .filter((_, el) => $(el).text().includes("ISSN"))
    .next().text().trim() || null;

  const eissn = $("td")
    .filter((_, el) => $(el).text().includes("E-ISSN"))
    .next().text().trim() || null;

  const accreditation_level =
    $("span.accr-badge").text().trim() ||
    $("body").text().match(/Sinta\s?[1-6]/i)?.[0] ||
    null;

  return {
    id: journalId,
    name,
    publisher,
    issn,
    eissn,
    accreditation_level,
    sinta_url: url
  };
}

module.exports = {
  scrapeJournal
};
