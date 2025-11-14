CREATE TABLE IF NOT EXISTS journals (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    publisher VARCHAR(255),
    issn VARCHAR(50),
    eissn VARCHAR(50),
    accreditation_level VARCHAR(10),
    sinta_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
