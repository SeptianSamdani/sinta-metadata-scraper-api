const db = require("../config/database");

async function deletePublicationsByAuthor(authorId) {
  await db.query(`DELETE FROM publications WHERE author_id = $1`, [authorId]);
}

async function insertPublication(authorId, publication) {
  const sql = `
    INSERT INTO publications (author_id, title, year, link, journal_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;

  const params = [
    authorId,
    publication.title,
    publication.year,
    publication.link,
    publication.journal_id || null
  ];

  const result = await db.query(sql, params);
  return result.rows[0];
}

async function getPublications(authorId) {
  const sql = `
    SELECT * 
    FROM publications 
    WHERE author_id = $1
    ORDER BY year DESC NULLS LAST
  `;

  const result = await db.query(sql, [authorId]);
  return result.rows;
}

module.exports = {
  deletePublicationsByAuthor,
  insertPublication,
  getPublications,
};
