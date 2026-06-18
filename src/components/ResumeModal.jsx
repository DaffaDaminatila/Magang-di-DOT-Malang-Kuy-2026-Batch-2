import React from 'react';

function ResumeModal({ namaPengguna, soalTersisa, onLanjutkan, onBatalkan }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">
          <i className="fa-solid fa-rotate-left"></i>
        </div>
        <h2 className="modal-title">Lanjutkan Kuis?</h2>
        <p className="modal-description">
          Halo <strong>{namaPengguna}</strong>, kami menemukan kuis yang belum selesai dengan <strong>{soalTersisa} soal</strong> tersisa. Apakah Anda ingin melanjutkannya?
        </p>
        <div className="modal-actions">
          <button className="btn-primary" onClick={onLanjutkan}>
            <i className="fa-solid fa-play"></i> Lanjutkan Kuis
          </button>
          <button className="btn-secondary" onClick={onBatalkan}>
            <i className="fa-solid fa-trash-can"></i> Mulai Baru
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
