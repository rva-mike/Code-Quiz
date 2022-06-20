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
    },
]


//variables
var questionNumber;
var timer = 80;
var runningTimer;
var username = "";
var score = 0;
var finalScore;



//DOM Objects
var startButtonEl = document.getElementById("startButton");
var questionContainerEl = document.getElementById("questionsContainer");
var gamesInstructionsEl = document.getElementById("gameInstructions");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answers");
var restartButtonEl = document.getElementById("restartButton");
var highScoresButtonEl = document.getElementById("showScoresButton");
var scoreAreaEl = document.getElementById("scoreArea");
var countdownEl = document.getElementById("timerArea");

//LocalStorage Objects
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Event listeners
startButtonEl.addEventListener("click", startGame);
restartButtonEl.addEventListener("click", restart);
highScoresButtonEl.addEventListener("click", displayScores);


//function to start the game
//called when start button is clicked, should run the function to display questions and the function to start the timer
function startGame() {
    highScoresButtonEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    scoreAreaEl.classList.add("hide");
    gamesInstructionsEl.classList.add("hide");
    // scoreAreaEl.classList.add("hide");
    answerButtonsEl.classList.remove("hide");
    questionNumber = 0;
    questionContainerEl.classList.remove("hide");
    // scoreAreaEl.innerHTML = "";
    startClock();
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
    showQuestion(questions[questionNumber]);
}


//function to display the questions
//should load one object from the questions array into the proper html elements, then run the function to collect answers
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


//function to collect answers
//should listen for what answer the user clicks on, compare it to the correct answer, and decrease the timer if wrong. should then run the next question function
//unless the current question is the last, then it should run the game over function
function selectAnswer(event) {
    var selectedButton = event.target;
    if (!selectedButton.dataset.correct) {
        timer = timer - 10;
        console.log(timer);
        // var incorrectMessage = "Wrong"
        // alert(incorrectMessage)
    } else {
        // var correctMessage = "correct"
        // alert(correctMessage)
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



//QUIZ DOES NOT CONTINUE AFTER WRONG ANSWER, CAN ANSWER WRONG MULTIPLE TIMES? KEEP?

// function selectAnswer(event) {
//     var selectedButton = event.target;
//     if (!selectedButton.dataset.correct) {
//         timer = timer - 10;
//         console.log(timer);
//         var incorrectMessage = "Wrong"
//         alert(incorrectMessage)
//     } else {
//         var correctMessage = "correct"
//         alert(correctMessage)

//         if (questionNumber == questions.length - 1) {
//             gameOver();
//         } else {
//             clearQuestion();
//             questionNumber++;
//             showQuestion(questions[questionNumber]);
//             console.log(score);
//         }
//     }
// }







//change color?
// if (answer.correct) {
//     button.dataset.correct = answer.correct
// }

// create p for correct/wonrg???
// var correctMessage = document.createElement("p")
//         document.createTextNode("CORRECT")
//         correctMessage.appendChild("body")







//function to clear the current question
//should empty the HTML elements that are occupied with the currently displayed question
function clearQuestion() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function gameOver() {
    clearQuestion();
    restartButtonEl.classList.remove("hide")

}

function restart() {
    restartButtonEl.classList.add("hide");
    highScoresButtonEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    scoreAreaEl.classList.add("hide");
    answerButtonsEl.classList.remove("hide");
    questionNumber = 0;
    questionContainerEl.classList.remove("hide");
    startClock();
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
    showQuestion(questions[questionNumber]);
}


//function to start the timer
//should run a countdown that is displayed in the HTML, when time is up, should run the game over function
function startClock() {
    countdownEl.innerHTML = "Time Remaining: " + timer + " seconds";
    if (timer <= 0) {
        gameOver();
    } else {
        timer -= 1;
        runningTimer = setTimeout(startClock, 1000);
    }
}


function showResults() {
    finalScore = timer;
    if (finalScore < 0) {
        finalScore = 0;
    }
    questionEl.innerText = "";
    scoreAreaEl.classList.remove("hide");
    answerButtonsEl.classList.add("hide");
    scoreAreaEl.innerHTML = `Your score is <b>${finalScore}</b>! </br></br> Please enter your initials below to see the high scores.<div id="init">Initials: <input type="text" name="initials" id="initials" placeholder="Enter Your Initials"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
    username = document.getElementById("initials");
    saveButton = document.getElementById("save-btn");
    username.addEventListener("keyup", function () {  //////KEY UP?????
        saveButton.disabled = !username.value;
    });
}


function gameOver() {
    clearInterval(runningTimer);
    countdownEl.innerHTML = "The quiz has ended!";
    clearQuestion();
    showResults();
    restartButtonEl.classList.remove("hide")
    // highScoresButtonEl.classList.remove("hide");


    // startButtonEl.classList.remove("hide");
    // startButtonEl.innerText = "Restart";
    timer = 90;
    score = 0;
}



//function to submit high scores
//should grab the users score and initials and add it to the high scores object, ranked numerically, and run the function to display the high scores
function submitScores() {
    var score = {
      score: finalScore,
      name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
  
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayScores();
  }




//function to display high scores
//should populate the HTML with a ranked display of the high scores and and provide the option to clear the scores via a function
function displayScores() {
    // clearInterval(runningTimer);
    // countdownEl.innerHTML = "";
    clearQuestion();
    questionEl.innerText = "";
    scoreAreaEl.classList.remove("hide");
  
    //using template literals to dynamically add html elements and attributes
    scoreAreaEl.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = highScores
      .map(score => {
        return `<li class="scoresList">${score.name} - ${score.score}</li>`;
      })
      .join(""); // DELTE ???
    // startButtonEl.classList.remove("hide");
  }


  //function to clear high scores
//should fire on click, and erase the values of the high scores object
function clearScores() {
    highScores = [];
    highScoresList.innerHTML = "<p>*Scores have been Cleared*</p>";
    // document.getElementById("clearScores").classList.add("hide");
    localStorage.clear();
  }