import React from 'react';

function QuizConfig({ 
  namaPengguna, 
  daftarKategori, 
  pengaturanKuis, 
  setPengaturanKuis, 
  onKembali, 
  onMulai 
}) {
  const handleChange = (key, value) => {
    setPengaturanKuis(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="quiz-card animate-fade-in">
      <div className="text-center">
        <h1 className="brand-title">Atur Kuis</h1>
        <p className="brand-subtitle">Selamat datang kembali, <strong>{namaPengguna}</strong>! Atur pilihan kuis Anda:</p>
      </div>

      <form onSubmit={onMulai}>
        <div className="form-group">
          <label className="form-label">Jumlah Soal</label>
          <select 
            className="form-select" 
            value={pengaturanKuis.amount} 
            onChange={(e) => handleChange('amount', parseInt(e.target.value))}
          >
            <option value="5">5 Soal (Cepat)</option>
            <option value="10">10 Soal (Standar)</option>
            <option value="15">15 Soal (Menantang)</option>
            <option value="20">20 Soal (Ahli)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Kategori</label>
          <select 
            className="form-select" 
            value={pengaturanKuis.category} 
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {daftarKategori.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Tingkat Kesulitan</label>
          <select 
            className="form-select" 
            value={pengaturanKuis.difficulty} 
            onChange={(e) => handleChange('difficulty', e.target.value)}
          >
            <option value="">Semua Kesulitan</option>
            <option value="easy">Mudah</option>
            <option value="medium">Sedang</option>
            <option value="hard">Sulit</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Tipe Pertanyaan</label>
          <select 
            className="form-select" 
            value={pengaturanKuis.type} 
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="">Semua Tipe</option>
            <option value="multiple">Pilihan Ganda</option>
            <option value="boolean">True / False</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Durasi Waktu</label>
          <select 
            className="form-select" 
            value={pengaturanKuis.duration} 
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
          >
            <option value="30">30 Detik</option>
            <option value="60">1 Menit</option>
            <option value="120">2 Menit</option>
            <option value="300">5 Menit</option>
            <option value="600">10 Menit</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onKembali}>
            <i className="fa-solid fa-chevron-left"></i> Kembali
          </button>
          <button type="submit" className="btn-primary" style={{ flex: 2 }}>
            Mulai Kuis <i className="fa-solid fa-rocket"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuizConfig;
