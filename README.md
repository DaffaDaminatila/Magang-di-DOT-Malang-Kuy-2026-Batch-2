# Aplikasi Kuis Interaktif - React + Vite

Proyek ini adalah aplikasi kuis interaktif yang dibangun menggunakan React dan Vite. Aplikasi ini mengambil data soal secara dinamis dari Open Trivia Database (OpenTDB) dan dilengkapi dengan berbagai fitur penting seperti sistem resume kuis (menggunakan LocalStorage) dan sistem timer global.

## Fitur Utama

1. **Halaman Login Sederhana**: Pengguna dapat memasukkan nama mereka sebelum memulai kuis.
2. **Kustomisasi Kuis (Konfigurasi)**:
   - Jumlah soal (5, 10, 15, 20).
   - Kategori soal (diambil secara dinamis dari API OpenTDB).
   - Tingkat kesulitan (Easy, Medium, Hard).
   - Tipe soal (Pilihan Ganda / True-False).
   - Durasi waktu pengerjaan kuis.
3. **Mekanisme Ujian (Satu Soal per Halaman)**:
   - Menampilkan satu soal pada satu waktu.
   - Pilihan jawaban langsung memicu perpindahan otomatis ke soal berikutnya.
4. **Mekanisme Resume Kuis (LocalStorage)**:
   - Jika browser ditutup secara tidak sengaja atau halaman di-refresh, aplikasi akan menyimpan progres (jawaban, indeks soal, sisa waktu).
   - Saat dibuka kembali, modal pilihan untuk melanjutkan kuis sebelumnya (*Resume*) atau memulai kuis baru akan muncul.
5. **Timer Global**:
   - Menggunakan countdown timer yang berkurang setiap detik.
   - Jika waktu habis sebelum semua soal terjawab, kuis akan otomatis ditutup dan diarahkan ke halaman hasil.
6. **Halaman Hasil (Analisis Nilai)**:
   - Menampilkan presentase skor akhir dengan indikator lingkaran progres SVG.
   - Menampilkan ringkasan jumlah jawaban Benar, Salah, dan Tidak Terjawab.
   - Menyediakan review log detail dari seluruh soal beserta jawaban yang dipilih vs jawaban yang benar.

## Cara Menjalankan Proyek

### Persyaratan
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).

### Langkah-langkah:
1. Clone repositori ini ke komputer lokal Anda.
2. Buka terminal di direktori proyek ini.
3. Jalankan perintah untuk menginstal dependencies:
   ```bash
   npm install
   ```
4. Jalankan server lokal untuk mode development:
   ```bash
   npm run dev
   ```
5. Buka alamat berikut di browser Anda:
   **http://localhost:5173/**
