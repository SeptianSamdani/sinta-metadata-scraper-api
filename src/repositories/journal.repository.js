const db = require("../config/database");

async function upsertJournal(journal) {
  const sql = `
    INSERT INTO journals (id, name, publisher, issn, eissn, accreditation_level, sinta_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id)
    DO UPDATE SET
      name = EXCLUDED.name,
      publisher = EXCLUDED.publisher,
      issn = EXCLUDED.issn,
      eissn = EXCLUDED.eissn,
      accreditation_level = EXCLUDED.accreditation_level,
      sinta_url = EXCLUDED.sinta_url,
      updated_at = NOW();
  `;

  const params = [
    journal.id,
    journal.name,
    journal.publisher,
    journal.issn,
    journal.eissn,
    journal.accreditation_level,
    journal.sinta_url
  ];

  await db.query(sql, params);
}

async function getJournalById(id) {
  const result = await db.query(
    `SELECT * FROM journals WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  upsertJournal,
  getJournalById,
};
