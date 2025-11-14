# SINTA Research Intelligence Backend

Layanan backend sederhana untuk mengumpulkan dan menyajikan metadata publikasi ilmiah dari SINTA (Science and Technology Index). Proyek ini dikembangkan sebagai bagian dari persiapan magang pada bidang *Web Development for Research Intelligence* di BRIN.

Tujuannya adalah mengotomatisasi proses pengambilan data peneliti dan publikasi, lalu menyimpannya ke dalam database untuk keperluan analisis, monitoring riset, dan integrasi ke sistem yang lebih besar.

---

## 🎯 Fitur Utama

- Scraping metadata peneliti dari SINTA (nama, afiliasi, URL profil)
- Scraping daftar publikasi (judul, tahun terbit, tautan sumber)
- Penyimpanan data terstruktur ke PostgreSQL
- REST API untuk akses data peneliti dan publikasinya
- Statistik publikasi per tahun
- Modular architecture (controller, service, repository)

---

## 🏗️ Teknologi yang Digunakan

| Teknologi | Peran |
|----------|------|
| Node.js + Express | Backend API dan routing |
| PostgreSQL | Database metadata peneliti dan publikasi |
| Cheerio + Axios | Web Scraping HTML SINTA |
| Dotenv | Manajemen konfigurasi environment |

---

## 📌 Endpoint API

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/author/scrape` | Ambil data peneliti dari SINTA dan simpan ke DB |
| GET | `/author/:id` | Ambil detail peneliti dari DB |
| GET | `/author/:id/publications` | Ambil daftar publikasi peneliti |
| GET | `/author/:id/stats/yearly` | Statistik jumlah publikasi per tahun |

---

## 🚀 Cara Menjalankan

```bash
git clone https://github.com/SeptianSamdani/sinta-research-intelligence-backend.git
cd sinta-research-intelligence-backend
npm install
```

### Buat file .env: 

```bash
APP_PORT=3000
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_DATABASE=sinta_db
PG_PORT=5432
```

### Jalankan Migration

```bash 
npm run migrate
```

### Jalankan Server
```bash 
npm start
```

---

## 📊 Contoh Respons API
```json
{
  "message": "Author scraped and saved successfully",
  "data": {
    "author": {
      "id": 6005170,
      "name": "Nama Peneliti",
      "affiliation": "Universitas X",
      "sinta_url": "https://sinta.kemdikbud.go.id/authors/profile/6005170"
    },
    "publications_saved": 10
  }
}

```

--- 

## 🧩 Rencana Pengembangan
- **Scraping pagination (lebih dari 10 publikasi)
- **Scraping tab Scopus / WOS / Garuda / Google Scholar
- **Cron job update otomatis
- **Dashboard frontend untuk visualisasi data

--- 

## ✨ Kontribusi

Proyek ini masih berkembang. Kritik, saran, dan kontribusi sangat diterima.