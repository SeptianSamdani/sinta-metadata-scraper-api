const db = require("../config/database");

async function deletePublicationsByAuthor(authorId) {
  await db.query(`DELETE FROM publications WHERE author_id = $1`, [authorId]);
}

async function insertPublication(authorId, pub) {
  const sql = `
    INSERT INTO publications (author_id, title, year, link)
    VALUES ($1, $2, $3, $4)
  `;

  const params = [authorId, pub.title, pub.year, pub.link];
  await db.query(sql, params);
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
