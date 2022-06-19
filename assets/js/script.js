var questions = [
    {
        question: "What is the correct html tag to link your .js file",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<script>", correct: true },
            { text: "<js>", correct: false },
            { text: "<java>", correct: false }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
          { text: 'msg("Hello World");', correct: false },
          { text: 'prompt("Hello World");', correct: false },
          { text: 'alertBox("Hello World");', correct: false },
          { text: 'alert("Hello World");', correct: true }
        ]
      },
    {
        question: "What Characters Contains an Array?",
        answers: [
          { text: "< >", correct: false },
          { text: "{ }", correct: false },
          { text: "[ ]", correct: true },
          { text: "# #", correct: false }
        ]
      }
]


//variables
var questionNumber;
var score = 0;
var timer = 80;



//DOM Objects
var startButtonEl = document.getElementById("startButton");
var questionContainerEl = document.getElementById("questionsContainer");
var gamesInstructionsEl = document.getElementById("gameInstructions")
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answers");
var restartButtonEl = document.getElementById("restartButton")
var highScoresButtonEl = document.getElementById("showScoresButton");
var scoreAreaEl = document.getElementById("scoreArea");








//Event listeners
startButtonEl.addEventListener("click", startGame);
restartButtonEl.addEventListener("click", restart);


function startGame() {
    startButtonEl.classList.add("hide");
    gamesInstructionsEl.classList.add("hide");
    answerButtonsEl.classList.remove("hide");
    questionContainerEl.classList.remove("hide");
    scoreAreaEl.classList.add("hide");

    questionNumber = 0;
    showQuestion(questions[questionNumber]);



}


function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsEl.appendChild(button);
    });
}

function selectAnswer(event) {
    var selectedButton = event.target;
    if (!selectedButton.dataset.correct) {
        timer = timer - 10;
        console.log(timer);
    }
    if (questionNumber == questions.length - 1) {
        gameOver();
    } else {
        clearQuestion();
        questionNumber++;
        showQuestion(questions[questionNumber]);
        console.log(score);
    }
}

function clearQuestion() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function gameOver() {
    clearQuestion();
    restartButtonEl.classList.remove("hide")

  }

  function restart () {
    restartButtonEl.classList.add("hide");
    highScoresButtonEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    scoreAreaEl.classList.add("hide");
    answerButtonsEl.classList.remove("hide");
    questionNumber = 0;
    questionContainerEl.classList.remove("hide");
  
    showQuestion(questions[questionNumber]);
  }