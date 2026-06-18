import React from 'react';

function Results({ 
  namaPengguna, 
  daftarSoal, 
  jawabanPengguna, 
  waktuAwal, 
  sisaWaktu, 
  onUlangi 
}) {
  const totalSoal = daftarSoal.length;
  const jumlahDikerjakan = Object.keys(jawabanPengguna).length;
  
  let jumlahBenar = 0;
  let jumlahSalah = 0;
  
  daftarSoal.forEach((soal, idx) => {
    if (jawabanPengguna[idx] !== undefined) {
      if (jawabanPengguna[idx] === soal.correct_answer) {
        jumlahBenar++;
      } else {
        jumlahSalah++;
      }
    }
  });

  const jumlahKosong = totalSoal - jumlahDikerjakan;
  const persentaseSkor = totalSoal > 0 ? Math.round((jumlahBenar / totalSoal) * 100) : 0;

  const dashOffset = 528 - (528 * persentaseSkor) / 100;

  return (
    <div className="quiz-card wide animate-fade-in">
      <div className="results-header">
        <h1 className="results-title">Kuis Selesai!</h1>
        <p className="results-username">Kerja bagus, <strong>{namaPengguna}</strong>!</p>
      </div>

      <div className="score-radial-wrapper">
        <svg className="score-circle-svg" width="180" height="180" viewBox="0 0 180 180">
          <circle className="score-circle-bg" cx="90" cy="90" r="84" />
          <circle 
            className="score-circle-bar" 
            cx="90" 
            cy="90" 
            r="84" 
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <div className="score-text-overlay">
          <span className="score-percent">{persentaseSkor}%</span>
          <span className="score-fraction">{jumlahBenar} / {totalSoal} Benar</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-val correct">{jumlahBenar}</div>
          <div className="stat-lbl">Benar</div>
        </div>
        <div className="stat-item">
          <div className="stat-val wrong">{jumlahSalah}</div>
          <div className="stat-lbl">Salah</div>
        </div>
        <div className="stat-item">
          <div className="stat-val unanswered">{jumlahKosong}</div>
          <div className="stat-lbl">Kosong</div>
        </div>
      </div>

      <h3 className="summary-section-title">Review Jawaban</h3>
      <div className="question-log-list">
        {daftarSoal.map((soal, idx) => {
          const jawabanUser = jawabanPengguna[idx];
          const isBenar = jawabanUser === soal.correct_answer;
          
          let statusLabel = 'unanswered';
          if (jawabanUser !== undefined) {
            statusLabel = isBenar ? 'correct' : 'wrong';
          }

          return (
            <div className="log-item" key={idx}>
              <div className="log-header">
                <span className="log-number">Soal {idx + 1}</span>
                <span className={`log-status-badge ${statusLabel}`}>
                  {statusLabel === 'correct' ? 'Benar' : statusLabel === 'wrong' ? 'Salah' : 'Kosong'}
                </span>
              </div>
              
              <div className="log-question-text">{soal.question}</div>
              
              <div className="log-answers">
                {statusLabel === 'correct' && (
                  <div className="log-ans-row correct-correct">
                    <i className="fa-solid fa-circle-check log-ans-icon"></i>
                    <span>Jawaban Anda: {jawabanUser}</span>
                  </div>
                )}

                {statusLabel === 'wrong' && (
                  <React.Fragment>
                    <div className="log-ans-row wrong-selected">
                      <i className="fa-solid fa-circle-xmark log-ans-icon"></i>
                      <span>Jawaban Anda: {jawabanUser}</span>
                    </div>
                    <div className="log-ans-row correct-correct" style={{ opacity: 0.8 }}>
                      <i className="fa-solid fa-circle-check log-ans-icon"></i>
                      <span>Jawaban Benar: {soal.correct_answer}</span>
                    </div>
                  </React.Fragment>
                )}

                {statusLabel === 'unanswered' && (
                  <div className="log-ans-row correct-correct" style={{ opacity: 0.8 }}>
                    <i className="fa-solid fa-circle-check log-ans-icon"></i>
                    <span>Jawaban Benar: {soal.correct_answer}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn-primary" onClick={onUlangi}>
        <i className="fa-solid fa-rotate-right"></i> Main Lagi
      </button>
    </div>
  );
}

export default Results;
