# NilaCare.AI (Frontend Next.js + Backend FastAPI Lokal)

Dokumentasi ini menjelaskan cara menjalankan aplikasi secara lokal sampai fitur upload gambar dan prediksi penyakit ikan berjalan end-to-end.

## 1. Prasyarat

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

## 2. Struktur Proyek Penting

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

## 3. Setup Frontend (Next.js)

Masuk ke folder proyek:

```bash
cd nilaai
```

Install dependency frontend:

```bash
npm install
```

## 4. Setup Backend (FastAPI)

Masih dari folder `nilaai`, masuk backend:

```bash
cd backend
```

Install dependency backend:

```bash
python -m pip install -r requirements.txt
```

> Catatan: model wajib ada di path `models/MobileNetV2_best.h5` relatif terhadap root folder `nilaai`.

## 5. Menjalankan Aplikasi (2 Terminal)

### Terminal A — Jalankan Backend

Dari folder `nilaai/backend`:

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Verifikasi backend aktif:

- Health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Terminal B — Jalankan Frontend

Dari folder `nilaai`:

```bash
npm run dev
```

Frontend default di:

- [http://localhost:3000](http://localhost:3000)

## 6. Konfigurasi Base URL Backend (Opsional)

Frontend default mengarah ke:

- `http://127.0.0.1:8000`

Jika ingin override, buat file `.env.local` di folder `nilaai`:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Lalu restart `npm run dev`.

## 7. Cara Uji End-to-End

1. Pastikan backend aktif (`/health` mengembalikan `{"status":"ok"}`).
2. Buka frontend di browser.
3. Upload 1 gambar (`jpeg/png/webp`).
4. Klik tombol prediksi.
5. Pastikan hasil menampilkan:
	- `label`
	- `confidence` dalam persen

## 8. Troubleshooting

### A. Error `ERR_CONNECTION_REFUSED` saat prediksi

Penyebab: backend belum jalan / port salah.

Solusi cepat:

1. Jalankan backend di `127.0.0.1:8000`.
2. Cek `http://127.0.0.1:8000/health`.
3. Pastikan frontend base URL benar (`NEXT_PUBLIC_API_BASE_URL`).

### B. Error model tidak ditemukan

Pastikan file ada di:

```text
nilaai/models/MobileNetV2_best.h5
```

### C. CORS error

Pastikan frontend di salah satu origin lokal yang diizinkan (contoh `localhost:3000` atau `127.0.0.1:3000`) dan backend aktif.

## 9. Script yang Dipakai

Frontend (`package.json`):

- `npm run dev` → jalankan Next.js development
- `npm run build` → build production
- `npm run start` → jalankan production build

Backend dijalankan via:

- `python -m uvicorn main:app --host 127.0.0.1 --port 8000`

---

Jika kedua server aktif, alur upload → backend inferensi → hasil klasifikasi akan berjalan lokal.
