var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "javascript", correct: false },
            { text: "script", correct: true },
            { text: "js", correct: false },
            { text: "java", correct: false }
        ]
    },
    {
        question: "Where is the correct place to insert JavaScript?",
        answers: [
            { text: "The Head Section", correct: false },
            { text: "The Body Section", correct: false },
            { text: "In an External File", correct: false },
            { text: "All of the Above", correct: true }
        ]
    },
]


//variables
var questionNumber;

//DOM Objects
var startButtonEl = document.getElementById("startButton");
var questionContainerEl = document.getElementById("questionsContainer");
var gamesInstructionsEl = document.getElementById("gameInstructions")
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answers");





//Event listeners
startButtonEl.addEventListener("click", startGame);


function startGame() {
    startButtonEl.classList.add("hide");
    gamesInstructionsEl.classList.add("hide");
    questionNumber = 0;
    questionContainerEl.classList.remove("hide");
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