const db = require("../config/database");

async function upsertAuthor(author) {
  const sql = `
    INSERT INTO authors (id, name, affiliation, sinta_url, last_scraped_at)
    VALUES ($1, $2, $3, $4, NOW())
    ON CONFLICT (id)
    DO UPDATE SET
      name = EXCLUDED.name,
      affiliation = EXCLUDED.affiliation,
      sinta_url = EXCLUDED.sinta_url,
      last_scraped_at = NOW();
  `;

  const params = [
    author.id,
    author.name,
    author.affiliation,
    author.sinta_url
  ];

  await db.query(sql, params);
}

async function getAuthorById(id) {
  const sql = `SELECT * FROM authors WHERE id = $1`;
  const result = await db.query(sql, [id]);
  return result.rows[0];
}

module.exports = {
  upsertAuthor,
  getAuthorById,
};
