ALTER TABLE publications
ADD COLUMN journal_id INTEGER REFERENCES journals(id);
