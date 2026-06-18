import React, { useEffect } from 'react';

function QuizActive({ 
  daftarSoal, 
  indeksAktif, 
  sisaWaktu, 
  setSisaWaktu, 
  waktuAwal, 
  onPilihJawaban, 
  onWaktuHabis 
}) {
  const soalAktif = daftarSoal[indeksAktif];
  
  useEffect(() => {
    if (sisaWaktu <= 0) {
      onWaktuHabis();
      return;
    }

    const timer = setInterval(() => {
      setSisaWaktu(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onWaktuHabis();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onWaktuHabis, setSisaWaktu]);

  const persentaseWaktu = (sisaWaktu / waktuAwal) * 100;

  const formatWaktu = (detik) => {
    const menit = Math.floor(detik / 60);
    const sisaDetik = detik % 60;
    return `${menit.toString().padStart(2, '0')}:${sisaDetik.toString().padStart(2, '0')}`;
  };

  const isWaktuKritis = sisaWaktu <= 15;

  return (
    <div className="quiz-card animate-fade-in">
      <div className="quiz-header">
        <div className="progress-info">
          <div className="progress-tracker">
            Soal <span>{indeksAktif + 1}</span> dari {daftarSoal.length}
          </div>
          <div className={`timer-box ${isWaktuKritis ? 'warning' : ''}`}>
            <i className="fa-regular fa-clock"></i> {formatWaktu(sisaWaktu)}
          </div>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className={`progress-bar-fill ${isWaktuKritis ? 'warning' : ''}`}
            style={{ width: `${persentaseWaktu}%` }}
          ></div>
        </div>
      </div>

      <div className="question-container">
        <div className="question-category">{soalAktif.category}</div>
        <h2 className="question-text">{soalAktif.question}</h2>
      </div>

      <div className="choices-list">
        {soalAktif.choices.map((pilihan, index) => {
          const letterBadge = String.fromCharCode(65 + index); // A, B, C, D...
          return (
            <button 
              key={index} 
              className="choice-button"
              onClick={() => onPilihJawaban(pilihan)}
            >
              <span className="choice-badge">{letterBadge}</span>
              <span>{pilihan}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizActive;
