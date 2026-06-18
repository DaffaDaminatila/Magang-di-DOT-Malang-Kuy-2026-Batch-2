export const decodeHTML = (str) => {
  if (!str) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const SOAL_CADANGAN = [
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Which country is home to the Kangaroo?",
    correct_answer: "Australia",
    incorrect_answers: ["South Africa", "Austria", "New Zealand"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "In web development, what does CSS stand for?",
    correct_answer: "Cascading Style Sheets",
    incorrect_answers: ["Counter Strike Source", "Corrective Style Sheet", "Computer Style Sheets"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the powerhouse of a computer, often referred to as its brain?",
    correct_answer: "CPU",
    incorrect_answers: ["GPU", "RAM", "Hard Drive"]
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "medium",
    question: "What is the capital of Australia?",
    correct_answer: "Canberra",
    incorrect_answers: ["Sydney", "Melbourne", "Brisbane"]
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "medium",
    question: "In what year did the Titanic sink?",
    correct_answer: "1912",
    incorrect_answers: ["1905", "1918", "1922"]
  },
  {
    category: "Sports",
    type: "boolean",
    difficulty: "easy",
    question: "The game of soccer is also known as football in many parts of the world.",
    correct_answer: "True",
    incorrect_answers: ["False"]
  },
  {
    category: "Science & Nature",
    type: "multiple",
    difficulty: "easy",
    question: "What is the chemical symbol for Water?",
    correct_answer: "H2O",
    incorrect_answers: ["CO2", "O2", "NaCl"]
  },
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "easy",
    question: "Who directed the movie 'Avatar'?",
    correct_answer: "James Cameron",
    incorrect_answers: ["Steven Spielberg", "Christopher Nolan", "Quentin Tarantino"]
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "medium",
    question: "Which of these is the main currency used in Japan?",
    correct_answer: "Yen",
    incorrect_answers: ["Won", "Yuan", "Ringgit"]
  },
  {
    category: "Science: Mathematics",
    type: "multiple",
    difficulty: "easy",
    question: "What is the square root of 144?",
    correct_answer: "12",
    incorrect_answers: ["10", "14", "16"]
  }
];
