let questions = [
    {
        question: "Which language is used to structure a webpage?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language is used to style a webpage?",
        options: ["HTML", "Java", "CSS", "SQL"],
        answer: "CSS"
    },
    {
        question: "Which language adds interactivity to a webpage?",
        options: ["JavaScript", "HTML", "CSS", "XML"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword declares a variable that can be reassigned?",
        options: ["const", "let", "fixed", "static"],
        answer: "let"
    },
    {
        question: "Which method adds an item to the end of an array?",
        options: ["pop()", "shift()", "push()", "join()"],
        answer: "push()"
    },
    {
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "Which method converts JSON text into a JavaScript value?",
        options: ["JSON.stringify()", "JSON.parse()", "getItem()", "push()"],
        answer: "JSON.parse()"
    },
    {
        question: "Which method saves data in Local Storage?",
        options: ["getItem()", "setItem()", "remove()", "write()"],
        answer: "setItem()"
    },
    {
        question: "Which loop is commonly used to repeat code a set number of times?",
        options: ["for loop", "if statement", "switch", "return"],
        answer: "for loop"
    },
    {
        question: "Which method selects an HTML element by its ID?",
        options: ["getElementsByClass()", "queryAll()", "getElementById()", "createElement()"],
        answer: "getElementById()"
    }
];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let answers = [];
let quiz = document.getElementById("quiz");
let questionNumber = document.getElementById("questionNumber");
let scoreText = document.getElementById("score");
let questionText = document.getElementById("question");
let optionsBox = document.getElementById("options");
let nextBtn = document.getElementById("nextBtn");
let message = document.getElementById("message");
let result = document.getElementById("result");
let restartBtn = document.getElementById("restartBtn");
let history = document.getElementById("history");
let clearHistoryBtn = document.getElementById("clearHistoryBtn");
// Load previous quiz results from Local Storage
let savedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
// Show previous results
function displayHistory() {
    history.innerHTML = "<h3>Previous Quiz Results</h3>";
    if (savedResults.length === 0) {
        history.innerHTML += "<p>No previous results yet.</p>";
        return;
    }
    for (let i = 0; i < savedResults.length; i++) {
        let item = document.createElement("div");
        item.className = "history-item";
        item.textContent =
            "Score: " + savedResults[i].score +
            "/" + savedResults[i].total +
            " | " + savedResults[i].percentage + "%";
        history.appendChild(item);
    }
}
// Clear previous quiz history
    clearHistoryBtn.addEventListener("click", function() {
    savedResults = [];
    localStorage.removeItem("quizResults");
    displayHistory();
});
// Display one question at a time
function showQuestion() {
    selectedAnswer = "";
    nextBtn.disabled = true;
    message.textContent = "";
    let current = questions[currentQuestion];
    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;
    questionText.textContent = current.question;
    scoreText.textContent = "Score: " + score;
    optionsBox.innerHTML = "";
    for (let i = 0; i < current.options.length; i++) {
        let button = document.createElement("button");
        button.className = "option";
        button.textContent = current.options[i];
        button.addEventListener("click", function() {
            selectAnswer(button, current.options[i]);
        });
        optionsBox.appendChild(button);
    }
}
// Handle selected answer
function selectAnswer(button, option) {
    if (selectedAnswer !== "") {
        return;
    }
    selectedAnswer = option;
    let current = questions[currentQuestion];
    let allOptions = optionsBox.children;
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].disabled = true;
    }
    if (selectedAnswer === current.answer) {
        score++;
        message.textContent = "Correct answer!";
    } else {
        message.textContent = "Incorrect answer!";
    }
    answers.push(selectedAnswer);
    scoreText.textContent = "Score: " + score;
    nextBtn.disabled = false;
}
// Go to next question or finish quiz
nextBtn.addEventListener("click", function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});
// Calculate and display final result
function finishQuiz() {
    quiz.style.display = "none";
    result.style.display = "block";
    restartBtn.style.display = "block";
    let percentage = (score / questions.length) * 100;
    result.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: <strong>${score} / ${questions.length}</strong></p>
        <p>Percentage: <strong>${percentage.toFixed(2)}%</strong></p>
        <p>${percentage >= 50 ? "Good job!" : "Keep practicing!"}</p>
    `;
    let quizResult = {
        score: score,
        total: questions.length,
        percentage: percentage.toFixed(2)
    };
    savedResults.push(quizResult);
    // Save results in Local Storage
    localStorage.setItem("quizResults", JSON.stringify(savedResults));
    displayHistory();
}
// Restart quiz
restartBtn.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = "";
    answers = [];
    result.style.display = "none";
    restartBtn.style.display = "none";
    quiz.style.display = "block";
    showQuestion();
});
// Start the quiz
displayHistory();
showQuestion();