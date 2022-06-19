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

var questionNumber;

//DOM Objects
var startButtonEl = document.getElementById("startButton");
var questionContainerEl = document.getElementById("questionsContainer");
var gamesInstructionsEl = document.getElementById("gameInstructions")


//Event listeners
startButtonEl.addEventListener("click", startGame);


function startGame (){
    startButtonEl.classList.add("hide");
    gamesInstructionsEl.classList.add("hide");


}
