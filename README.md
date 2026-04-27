# NilaCare.AI (Frontend Next.js + Backend FastAPI Lokal)

Panduan ini menjelaskan cara menjalankan aplikasi **end-to-end** di lokal: dari install dependency, menyalakan backend + frontend, sampai uji prediksi gambar.

## 1) Prasyarat

Pastikan perangkat sudah terpasang:

- Node.js 20+ dan npm
- Python 3.13
- Git

Cek versi:

```bash
node -v
npm -v
python --version
git --version
```

## 2) Struktur Proyek Penting

```text
nilaai/
├─ app/                 # Next.js App Router
├─ components/          # Komponen UI
├─ lib/                 # Helper API frontend
├─ backend/             # FastAPI local inference API
│  ├─ main.py
│  ├─ labels.py
│  └─ requirements.txt
└─ models/
	└─ MobileNetV2_best.h5
```

## 3) Setup Frontend

Dari folder root proyek (`nilaai`):

```bash
npm install
```

## 4) Setup Backend (Direkomendasikan Pakai Virtual Environment)

Masih dari folder root proyek (`nilaai`), jalankan:

### Windows (PowerShell)

```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt
```

### macOS/Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt
```

> Catatan penting: model harus ada di `models/MobileNetV2_best.h5`.

## 5) Menjalankan Aplikasi (2 Terminal)

Gunakan dua terminal terpisah.

### Terminal A — Backend

Dari folder `nilaai`:

```bash
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Verifikasi backend aktif:

- Health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- Swagger: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Terminal B — Frontend

Dari folder `nilaai`:

```bash
npm run dev
```

Frontend default:

- [http://localhost:3000](http://localhost:3000)

## 6) Konfigurasi Environment (`.env.local`)

Buat file `.env.local` di root proyek:

```env
NEXT_PUBLIC_API_BASE_URL=https://nilacareai.takumifahri.my.id
GEMINI_API_KEY=your_gemini_api_key
```

Keterangan:

- `NEXT_PUBLIC_API_BASE_URL` dipakai frontend untuk request prediksi (`/predict`) ke backend model.
- `GEMINI_API_KEY` dipakai **server-side** oleh route Next.js `/api/chat` (jangan dipakai di client).

Jika variabel `NEXT_PUBLIC_API_BASE_URL` tidak diisi, frontend fallback ke `http://127.0.0.1:8000` untuk dev lokal.

Lalu restart frontend (`npm run dev`).

## 7) Cara Uji End-to-End di UI

1. Pastikan backend aktif (`/health` mengembalikan `{"status":"ok"}`).
2. Buka frontend di browser.
3. Upload 1 gambar (`jpeg/png/webp`).
4. Klik tombol prediksi.
5. Pastikan hasil menampilkan:
	- `label`
	- `confidence` (format persen di UI)

## 8) Uji Endpoint Langsung (Opsional)

Contoh via `curl`:

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample.jpg"
```

## 9) Troubleshooting

### A. `ERR_CONNECTION_REFUSED` saat prediksi

Penyebab umum: backend belum jalan atau URL backend salah.

Solusi:

1. Jalankan backend di `127.0.0.1:8000`.
2. Cek [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health).
3. Cek `.env.local` (`NEXT_PUBLIC_API_BASE_URL`).

### B. Error model tidak ditemukan

Pastikan file model berada di:

```text
nilaai/models/MobileNetV2_best.h5
```

### C. CORS error

Pastikan frontend berjalan pada origin lokal yang diizinkan (`localhost:3000`, `127.0.0.1:3000`, `localhost:3001`, atau `127.0.0.1:3001`).

## 10) Menjalankan Mode Production (Frontend)

```bash
npm run build
npm run start
```

## 11) Menghentikan Service

- Di terminal backend: `Ctrl + C`
- Di terminal frontend: `Ctrl + C`

---

Jika backend dan frontend aktif, alur upload gambar → inferensi model → hasil klasifikasi akan berjalan lokal dengan baik.
