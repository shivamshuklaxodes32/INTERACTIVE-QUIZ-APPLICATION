// ==== Quiz Questions for Categories ====
const questions = {
  gk: [
    { q: "Which is the largest planet in our Solar System?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    { q: "Who is known as the Father of the Nation in India?", options: ["Subhash Chandra Bose", "Mahatma Gandhi", "Bhagat Singh", "Jawaharlal Nehru"], answer: "Mahatma Gandhi" },
    { q: "Which is the smallest continent?", options: ["Australia", "Europe", "Antarctica", "South America"], answer: "Australia" }
  ],
  science: [
    { q: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2"], answer: "H2O" },
    { q: "Which gas is essential for us to breathe?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"], answer: "Oxygen" },
    { q: "What is the speed of light?", options: ["3x10^8 m/s", "3x10^6 m/s", "1.5x10^8 m/s", "300 m/s"], answer: "3x10^8 m/s" }
  ],
  sports: [
    { q: "How many players are there in a football team?", options: ["9", "10", "11", "12"], answer: "11" },
    { q: "Which country won the Cricket World Cup 2011?", options: ["Australia", "India", "Sri Lanka", "England"], answer: "India" },
    { q: "In which sport is the term 'love' used?", options: ["Cricket", "Tennis", "Football", "Hockey"], answer: "Tennis" }
  ],
  movies: [
    { q: "Who directed the movie 'Inception'?", options: ["Christopher Nolan", "James Cameron", "Steven Spielberg", "Quentin Tarantino"], answer: "Christopher Nolan" },
    { q: "Which movie features the song 'My Heart Will Go On'?", options: ["Avatar", "Titanic", "The Bodyguard", "Frozen"], answer: "Titanic" },
    { q: "Who played Iron Man in the Marvel movies?", options: ["Chris Evans", "Mark Ruffalo", "Robert Downey Jr.", "Tom Holland"], answer: "Robert Downey Jr." }
  ]
};

let currentCategory = "";
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let selectedQuestions = [];

// ==== DOM Elements ====
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const highScoresEl = document.getElementById("high-scores");

// ==== Start Quiz ====
function startQuiz(category) {
  currentCategory = category;
  currentIndex = 0;
  score = 0;
  timeLeft = 15;

  // Shuffle questions
  selectedQuestions = [...questions[category]].sort(() => Math.random() - 0.5);

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion();
}

// ==== Load Question ====
function loadQuestion() {
  if (currentIndex >= selectedQuestions.length) {
    return endQuiz();
  }

  const currentQ = selectedQuestions[currentIndex];
  questionEl.textContent = currentQ.q;
  optionsEl.innerHTML = "";

  currentQ.options.sort(() => Math.random() - 0.5).forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(opt, currentQ.answer);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

// ==== Timer ====
function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentIndex++;
      loadQuestion();
    }
  }, 1000);
}

// ==== Check Answer ====
function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++;
  }
  currentIndex++;
  loadQuestion();
}

// ==== End Quiz ====
function endQuiz() {
  clearInterval(timer);
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreEl.textContent = `You scored ${score} / ${selectedQuestions.length}`;
  saveHighScore(score);
  showHighScores();
}

// ==== Restart Quiz ====
function restartQuiz() {
  startQuiz(currentCategory);
}

// ==== Go Home ====
function goHome() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

// ==== High Scores with LocalStorage ====
function saveHighScore(score) {
  let scores = JSON.parse(localStorage.getItem("highScores")) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5); // keep top 5
  localStorage.setItem("highScores", JSON.stringify(scores));
}

function showHighScores() {
  let scores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresEl.innerHTML = "";
  scores.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `#${i + 1}: ${s}`;
    highScoresEl.appendChild(li);
  });
}
