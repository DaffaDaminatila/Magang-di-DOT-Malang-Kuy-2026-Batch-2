import { useState, useEffect } from 'react';
import Login from './components/Login';
import QuizConfig from './components/QuizConfig';
import QuizActive from './components/QuizActive';
import Results from './components/Results';
import ResumeModal from './components/ResumeModal';
import { decodeHTML, shuffleArray, SOAL_CADANGAN } from './utils/helpers';

function App() {
  const [layar, setLayar] = useState('LOGIN');
  const [namaPengguna, setNamaPengguna] = useState('');
  const [pengaturanKuis, setPengaturanKuis] = useState({
    amount: 10,
    category: '27',
    difficulty: 'medium',
    type: 'multiple',
    duration: 120
  });
  const [daftarKategori, setDaftarKategori] = useState([]);
  const [daftarSoal, setDaftarSoal] = useState([]);
  const [indeksAktif, setIndeksAktif] = useState(0);
  const [jawabanPengguna, setJawabanPengguna] = useState({});
  const [sisaWaktu, setSisaWaktu] = useState(120);
  const [waktuAwal, setWaktuAwal] = useState(120);
  
  const [dataResume, setDataResume] = useState(null);
  const [tampilkanModalResume, setTampilkanModalResume] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.trivia_categories) {
          setDaftarKategori(data.trivia_categories);
        }
      })
      .catch(err => {
        console.warn("Failed to fetch categories, using fallbacks.", err);
      });

    const saved = localStorage.getItem('dot_quiz_save_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed && 
          parsed.layar === 'QUIZ' && 
          parsed.sisaWaktu > 0 && 
          parsed.daftarSoal && 
          parsed.daftarSoal.length > 0 &&
          parsed.indeksAktif < parsed.daftarSoal.length
        ) {
          setDataResume(parsed);
          setTampilkanModalResume(true);
        }
      } catch (e) {
        console.error("Failed to parse saved state", e);
        localStorage.removeItem('dot_quiz_save_state');
      }
    }
  }, []);

  useEffect(() => {
    if (layar === 'QUIZ' && daftarSoal.length > 0) {
      const state = {
        namaPengguna,
        pengaturanKuis,
        daftarSoal,
        indeksAktif,
        jawabanPengguna,
        sisaWaktu,
        waktuAwal,
        layar
      };
      localStorage.setItem('dot_quiz_save_state', JSON.stringify(state));
    }
  }, [layar, indeksAktif, jawabanPengguna, sisaWaktu, daftarSoal, namaPengguna, pengaturanKuis, waktuAwal]);

  const lanjutkanKuis = () => {
    if (dataResume) {
      setNamaPengguna(dataResume.namaPengguna);
      setPengaturanKuis(dataResume.pengaturanKuis);
      setDaftarSoal(dataResume.daftarSoal);
      setIndeksAktif(dataResume.indeksAktif);
      setJawabanPengguna(dataResume.jawabanPengguna);
      setSisaWaktu(dataResume.sisaWaktu);
      setWaktuAwal(dataResume.waktuAwal);
      setLayar('QUIZ');
    }
    setTampilkanModalResume(false);
  };

  const batalkanResume = () => {
    localStorage.removeItem('dot_quiz_save_state');
    setDataResume(null);
    setTampilkanModalResume(false);
  };

  const mulaiKuis = async (e) => {
    if (e) e.preventDefault();
    if (!namaPengguna.trim()) return;

    setLayar('LOADING');

    const { amount, category, difficulty, type, duration } = pengaturanKuis;
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (type) url += `&type=${type}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code === 0 && data.results && data.results.length > 0) {
        const processed = data.results.map((q) => {
          const decodedCorrect = decodeHTML(q.correct_answer);
          const decodedIncorrect = q.incorrect_answers.map(ans => decodeHTML(ans));
          
          let choices = [];
          if (q.type === 'boolean') {
            choices = ['True', 'False'];
          } else {
            choices = shuffleArray([...decodedIncorrect, decodedCorrect]);
          }

          return {
            category: q.category,
            type: q.type,
            difficulty: q.difficulty,
            question: decodeHTML(q.question),
            correct_answer: decodedCorrect,
            choices: choices
          };
        });

        setDaftarSoal(processed);
        setIndeksAktif(0);
        setJawabanPengguna({});
        setSisaWaktu(duration);
        setWaktuAwal(duration);
        setLayar('QUIZ');
      } else if (data.response_code === 1) {
        throw new Error("API has insufficient questions matching your criteria.");
      } else {
        throw new Error(`API error code: ${data.response_code}`);
      }
    } catch (error) {
      console.warn("Quiz fetch error, starting fallback quiz:", error.message);
      const mockShuffled = shuffleArray(SOAL_CADANGAN).slice(0, Math.min(amount, SOAL_CADANGAN.length));
      const processedFallback = mockShuffled.map(q => {
        let choices = [];
        if (q.type === 'boolean') {
          choices = ['True', 'False'];
        } else {
          choices = shuffleArray([...q.incorrect_answers, q.correct_answer]);
        }
        return {
          ...q,
          choices
        };
      });
      setDaftarSoal(processedFallback);
      setIndeksAktif(0);
      setJawabanPengguna({});
      setSisaWaktu(duration);
      setWaktuAwal(duration);
      setLayar('QUIZ');
    }
  };

  const pilihJawaban = (pilihanTerpilih) => {
    setJawabanPengguna(prev => ({
      ...prev,
      [indeksAktif]: pilihanTerpilih
    }));

    if (indeksAktif < daftarSoal.length - 1) {
      setIndeksAktif(prev => prev + 1);
    } else {
      selesaikanKuis();
    }
  };

  const selesaikanKuis = () => {
    localStorage.removeItem('dot_quiz_save_state');
    setLayar('RESULTS');
  };

  const ulangiKuis = () => {
    setLayar('CONFIG');
    setDaftarSoal([]);
    setJawabanPengguna({});
    setIndeksAktif(0);
  };

  return (
    <>
      {tampilkanModalResume && (
        <ResumeModal 
          namaPengguna={dataResume?.namaPengguna}
          soalTersisa={dataResume?.daftarSoal.length - Object.keys(dataResume?.jawabanPengguna || {}).length}
          onLanjutkan={lanjutkanKuis}
          onBatalkan={batalkanResume}
        />
      )}

      {layar === 'LOGIN' && (
        <Login 
          namaPengguna={namaPengguna} 
          setNamaPengguna={setNamaPengguna} 
          onLanjut={() => setLayar('CONFIG')} 
        />
      )}

      {layar === 'CONFIG' && (
        <QuizConfig 
          namaPengguna={namaPengguna}
          daftarKategori={daftarKategori}
          pengaturanKuis={pengaturanKuis}
          setPengaturanKuis={setPengaturanKuis}
          onKembali={() => setLayar('LOGIN')}
          onMulai={mulaiKuis}
        />
      )}

      {layar === 'LOADING' && (
        <div className="quiz-card text-center animate-fade-in">
          <h2 className="brand-title">Menyiapkan Kuis</h2>
          <p className="brand-subtitle">Merangkai soal-soal berkualitas untuk Anda...</p>
          <div className="loading-spinner"></div>
        </div>
      )}

      {layar === 'QUIZ' && (
        <QuizActive 
          daftarSoal={daftarSoal}
          indeksAktif={indeksAktif}
          sisaWaktu={sisaWaktu}
          setSisaWaktu={setSisaWaktu}
          waktuAwal={waktuAwal}
          onPilihJawaban={pilihJawaban}
          onWaktuHabis={selesaikanKuis}
        />
      )}

      {layar === 'RESULTS' && (
        <Results 
          namaPengguna={namaPengguna}
          daftarSoal={daftarSoal}
          jawabanPengguna={jawabanPengguna}
          waktuAwal={waktuAwal}
          sisaWaktu={sisaWaktu}
          onUlangi={ulangiKuis}
        />
      )}
    </>
  );
}

export default App;
