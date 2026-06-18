import React, { useState } from 'react';

function Login({ namaPengguna, setNamaPengguna, onLanjut }) {
  const [kataSandi, setKataSandi] = useState('');
  const [tampilkanSandi, setTampilkanSandi] = useState(false);
  const [errorValidasi, setErrorValidasi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorValidasi('');

    if (namaPengguna.trim().length < 3) {
      setErrorValidasi('Nama pengguna minimal harus 3 karakter.');
      return;
    }

    if (kataSandi.length < 4) {
      setErrorValidasi('Kata sandi minimal harus 4 karakter.');
      return;
    }

    // Login Berhasil (Mock Auth)
    onLanjut();
  };

  return (
    <div className="quiz-card animate-fade-in">
      <div className="text-center">
        <h1 className="brand-title"><i className="fa-solid fa-brain"></i> CyberQuiz</h1>
        <p className="brand-subtitle">Aplikasi Kuis Interaktif berbasis React & OpenTDB</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {errorValidasi && (
          <div style={{
            background: 'var(--status-error-bg)',
            color: 'var(--status-error)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.855rem',
            fontWeight: 600,
            marginBottom: '20px',
            border: '1px solid var(--status-error)'
          }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '8px' }}></i>
            {errorValidasi}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Nama Pengguna (Username)</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Masukkan username" 
            value={namaPengguna} 
            onChange={(e) => setNamaPengguna(e.target.value)} 
            required 
            autoFocus
          />
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label className="form-label">Kata Sandi (Password)</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={tampilkanSandi ? "text" : "password"} 
              className="form-input" 
              placeholder="Masukkan password" 
              value={kataSandi} 
              onChange={(e) => setKataSandi(e.target.value)} 
              required 
              style={{ paddingRight: '46px' }}
            />
            <button
              type="button"
              onClick={() => setTampilkanSandi(!tampilkanSandi)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
            >
              <i className={tampilkanSandi ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </button>
          </div>
        </div>
        
        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
          Masuk <i className="fa-solid fa-sign-in-alt"></i>
        </button>
      </form>
    </div>
  );
}

export default Login;
