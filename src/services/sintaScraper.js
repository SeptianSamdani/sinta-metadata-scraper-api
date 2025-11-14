const axios = require("axios");
const cheerio = require("cheerio");
const randomUserAgent = require("../utils/randomUserAgent");

async function scrapeAuthorProfile(authorId) {
  const url = `https://sinta.kemdikbud.go.id/authors/profile/${authorId}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": randomUserAgent(),
    },
  });

  const $ = cheerio.load(response.data);

  // ========================
  //   PARSE NAME
  // ========================
  const name =
    $("h3").first().text().trim() ||
    $("div.profile-info h3").text().trim() ||
    "";

  // ========================
  //   PARSE AFFILIATION
  // ========================
  // ambil baris setelah nama
  const affiliation =
    $("h3").first().next().text().trim() ||
    $("p.text-muted").first().text().trim() ||
    $("div.profile-info p").first().text().trim() ||
    $("body").text().match(/Universitas\s+[A-Za-z ]+/)?.[0] ||
    "";

  // ========================
  //   PARSE PUBLICATIONS
  // ========================
  const publications = [];

$(".ar-list-item").each((_, el) => {
  const titleEl = $(el).find(".ar-title a");
  const yearEl = $(el).find(".ar-year");

  // VALIDASI WAJIB:
  // jika tidak ada judul, skip (ini blok kosong)
  if (titleEl.length === 0) return;
  if (yearEl.length === 0) return;

  const title = titleEl.text().trim();
  const link = titleEl.attr("href") || null;

  let year = parseInt(yearEl.text().trim());
  if (isNaN(year)) year = null;

  publications.push({
    title,
    year,
    link
  });
});

  return {
    id: authorId,
    name,
    affiliation,
    sinta_url: url,
    publications,
  };
}

module.exports = {
  scrapeAuthorProfile,
};
