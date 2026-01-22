const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correct: 2
  },
  {
    question: "Which is not a programming language?",
    options: ["Python", "Java", "HTML", "C"],
    correct: 2
  }
];
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let answered = false;
let timeLeft = 10;
let timer = null;
// LOAD QUESTION 
function loadQuestion() {
  answered = false;
  resetOptions();
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  optionButtons.forEach((btn, index) => {
    btn.style.display = "block";
    btn.textContent = current.options[index];
  });
  startTimer();
}

//OPTION CLICK 
optionButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    const correctIndex = quizData[currentQuestion].correct;
    if (index === correctIndex) {
      button.style.backgroundColor = "green";
      score++;
    } else {
      button.style.backgroundColor = "red";
      optionButtons[correctIndex].style.backgroundColor = "green";
    }
  });
});

//RESET OPTIONS 
function resetOptions() {
  optionButtons.forEach(button => {
    button.style.backgroundColor = "";
  });
}

//
nextBtn.addEventListener("click", () => {
  if (!answered) return;
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
});

//RESULT 
function showResult() {
  questionEl.textContent = `Quiz Completed! Your Score: ${score}/${quizData.length}`;

  optionButtons.forEach(button => button.style.display = "none");
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
}


//TIMER
function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}


// AUTO NEXT (TIMEOUT) 
function autoNext() {
  if (answered) return;
  answered = true;
  const correctIndex = quizData[currentQuestion].correct;
  optionButtons[correctIndex].style.backgroundColor = "green";
}
loadQuestion();
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  answered = false;

  optionButtons.forEach(button => button.style.display = "block");
  nextBtn.style.display = "block";
  restartBtn.style.display = "none";

  loadQuestion();
});

